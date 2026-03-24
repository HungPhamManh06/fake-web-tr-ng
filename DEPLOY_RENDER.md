# Deploy fake-web-truong len Render

## 1) Backend service

1. Tao service moi tu folder `backend`.
2. Chon Runtime: `Node`.
3. Build command: `npm install`.
4. Start command: `npm run start`.
5. Tao bien moi truong:
   - `PORT=8080`
   - `CORS_ORIGIN=<domain frontend Render cua ban>`
   - `DATA_DIR=/var/data`
6. Gan persistent disk:
   - Mount path: `/var/data`
   - Size: 1GB (hoac lon hon neu can)

## 2) Frontend service

1. Tao service moi tu root project (folder frontend hien tai).
2. Chon Runtime: `Static Site`.
3. Build command: `npm install && npm run build`.
4. Publish directory: `dist`.
5. Tao bien moi truong:
   - `VITE_API_URL=https://<domain-backend>.onrender.com/api`

## 3) Kiem tra sau deploy

1. Mo frontend URL.
2. Thu them 1 sinh vien.
3. Tai lai trang, kiem tra du lieu van con.
4. Redeploy backend, kiem tra du lieu con ton tai (xac nhan disk da hoat dong).