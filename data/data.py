import json
import re

# --- 1. Đọc và Dọn dẹp Dữ liệu JS ---
try:
    with open('data.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
    print("Đã đọc tệp data.js.")
except Exception as e:
    print(f"Lỗi khi đọc tệp: {e}")
    js_content = ""
    exit() # Thoát nếu không đọc được tệp

# Tìm đối tượng DATA bằng regex
match = re.search(r'export\s+const\s+DATA\s+=\s+(\{.*\});', js_content, re.DOTALL)

if not match:
    print("Không thể trích xuất đối tượng DATA từ data.js.")
    exit() # Thoát nếu không tìm thấy
    
data_str = match.group(1)

# --- Các bước dọn dẹp chuỗi ---

# 1. Thêm dấu ngoặc kép cho keys không có
data_str = re.sub(r'([{\r\n,]\s*)([a-zA-Z0-9_]+)(\s*:)', r'\1"\2"\3', data_str)

# 2. Xóa dấu phẩy thừa (trailing commas)
data_str = re.sub(r',\s*([}\]])', r'\1', data_str)

# 3. Chuyển đổi tất cả chuỗi dùng nháy đơn ('...') thành nháy kép ("...")
def single_to_double_replacer(match):
    colon_part = match.group(1) # Phần dấu hai chấm và khoảng trắng (ví dụ: ": ")
    string_content = match.group(2) # Nội dung *bên trong* cặp nháy đơn
    
    # 1. Thoát (escape) bất kỳ dấu nháy kép (") nào bên trong
    string_content = string_content.replace('"', '\\"')
    # 2. Hủy thoát (un-escape) bất kỳ dấu nháy đơn (\') nào bên trong
    string_content = string_content.replace("\\'", "'")
    
    # Trả về chuỗi JSON hợp lệ với dấu nháy kép
    return f'{colon_part}"{string_content}"'

# Regex này tìm (dấu : + khoảng trắng) theo sau là một chuỗi nháy đơn
data_str = re.sub(r'(:\s*)\'(.*?)\'', 
                  single_to_double_replacer, 
                  data_str, 
                  flags=re.DOTALL) # DOTALL để '.' khớp cả ký tự xuống dòng

# --- 2. Phân tích (Parse) JSON ---
try:
    data = json.loads(data_str)
    print("Đã phân tích (parse) nội dung data.js thành công.")
except json.JSONDecodeError as e:
    print(f"LỖI GIẢI MÃ JSON: {e}")
    print("Đây là phân đoạn có vấn đề (sau khi đã cố sửa):")
    print(repr(data_str[max(0, e.pos-50):e.pos+50]))
    data = {}
    exit() # Thoát nếu không parse được

# --- 3. Chuyển đổi dữ liệu (nếu parse thành công) ---

# --- Tạo các bản đồ (map) để tra cứu nhanh ---
artists_map = {a['artist_id']: a for a in data.get('artists', [])}
albums_map = {a['album_id']: a for a in data.get('albums', [])}
# TẠO SONG MAP ĐỂ TRA CỨU TÊN
songs_map = {s['song_id']: s for s in data.get('songs', [])}

# --- Xử lý Bộ sưu tập 'songs' ---
songs_collection = []
for song in data.get('songs', []):
    artist_info = artists_map.get(song.get('artist_id'), {})
    album_info = albums_map.get(song.get('album_id'), {})
    new_song = {
        '_id': f'song_{song.get("song_id")}',
        'song_id': song.get('song_id'),
        'title': song.get('title'),
        'duration': song.get('duration'),
        'image_url': song.get('image_url'),
        'audio_url': song.get('audio_url'),
        'artist': {'artist_id': artist_info.get('artist_id'), 'name': artist_info.get('name')},
        'album': {'album_id': album_info.get('album_id'), 'title': album_info.get('title'), 'release_date': album_info.get('release_date')},
        'lyric': song.get('lyric')
    }
    songs_collection.append(new_song)

# --- Xử lý Bộ sưu tập 'artists' ---
artists_collection = []
artist_albums = {}
for album in data.get('albums', []):
    artist_id = album.get('artist_id')
    if artist_id:
        if artist_id not in artist_albums: artist_albums[artist_id] = []
        embedded_album = {k: v for k, v in album.items() if k != 'artist_id'}
        artist_albums[artist_id].append(embedded_album)

for artist in data.get('artists', []):
    artist_id = artist.get('artist_id')
    new_artist = {
        '_id': f'artist_{artist_id}',
        'artist_id': artist_id,
        'name': artist.get('name'),
        'bio': artist.get('bio'),
        'image_url': artist.get('image_url'),
        'albums': artist_albums.get(artist_id, [])
    }
    artists_collection.append(new_artist)

# --- Xử lý Bộ sưu tập 'users' ---
users_collection = []

# CẬP NHẬT: Map playlist_song, thêm cả title
playlist_songs_map = {}
for entry in data.get('playlist_song', []):
    pid = entry.get('playlist_id')
    if pid:
        if pid not in playlist_songs_map: playlist_songs_map[pid] = []
        
        song_id = entry.get('song_id')
        song_info = songs_map.get(song_id, {})
        song_title = song_info.get('title', 'Không rõ tên')
        
        playlist_songs_map[pid].append({
            "song_id": song_id,
            "title": song_title
        })

user_playlists = {}
for playlist in data.get('playlists', []):
    uid = playlist.get('user_id')
    if uid:
        if uid not in user_playlists: user_playlists[uid] = []
        playlist['songs'] = playlist_songs_map.get(playlist.get('playlist_id'), [])
        embedded_playlist = {k: v for k, v in playlist.items() if k != 'user_id'}
        user_playlists[uid].append(embedded_playlist)

# CẬP NHẬT: Map favorites, thêm cả title
user_favorites = {}
for fav in data.get('favorite', []):
    uid = fav.get('user_id')
    if uid:
        if uid not in user_favorites: user_favorites[uid] = []
        
        song_id = fav.get('song_id')
        song_info = songs_map.get(song_id, {})
        song_title = song_info.get('title', 'Không rõ tên')

        user_favorites[uid].append({
            "song_id": song_id,
            "title": song_title
        })

# CẬP NHẬT: Map listen history, thêm cả title
user_history = {}
for history in data.get('listen_history', []):
    uid = history.get('user_id')
    if uid:
        if uid not in user_history: user_history[uid] = []
        
        song_id = history.get('song_id')
        song_info = songs_map.get(song_id, {})
        song_title = song_info.get('title', 'Không rõ tên')
        
        embedded_history = {
            "song_id": song_id,
            "title": song_title,
            "listened_at": history.get("listened_at")
        }
        user_history[uid].append(embedded_history)

for user in data.get('users', []):
    user_id = user.get('user_id')
    new_user = {
        '_id': f'user_{user_id}',
        'user_id': user_id,
        'username': user.get('username'),
        'email': user.get('email'),
        'avatar_url': user.get('avatar_url'),
        'created_at': user.get('created_at'),
        'playlists': user_playlists.get(user_id, []),
        'favorite_songs': user_favorites.get(user_id, []),
        'listen_history': user_history.get(user_id, [])
    }
    users_collection.append(new_user)
    
# --- 4. Ghi ra các tệp JSON ---
try:
    with open('users.json', 'w', encoding='utf-8') as f:
        json.dump(users_collection, f, ensure_ascii=False, indent=4)
    print("Đã tạo tệp users.json thành công (đã cập nhật object bài hát).")
    
    with open('artists.json', 'w', encoding='utf-8') as f:
        json.dump(artists_collection, f, ensure_ascii=False, indent=4)
    print("Đã tạo tệp artists.json thành công.")
    
    with open('songs.json', 'w', encoding='utf-8') as f:
        json.dump(songs_collection, f, ensure_ascii=False, indent=4)
    print("Đã tạo tệp songs.json thành công.")
    
    print("\nHoàn tất! Đã tạo 3 tệp JSON.")

except Exception as e:
    print(f"Lỗi khi ghi ra tệp JSON: {e}")