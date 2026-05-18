# MOS — Medical Operating System

> Hệ thống lõi HIS: quản lý khám chữa bệnh, viện phí, dược, BHYT.

**Path**: `BACKEND/MOS/HIS.Core/`  
**Quy mô**: 525+ managers · 896 controllers  
**Entity prefix**: `His*`

---

## Chức năng chính

### Quản lý bệnh nhân & tiếp đón
- Tiếp đón, đăng ký khám
- Tra cứu hồ sơ, lịch sử điều trị
- Kiosk tự đăng ký

### Quản lý dịch vụ & chỉ định
- Chỉ định dịch vụ cận lâm sàng
- Phân công ca trực, thực hiện dịch vụ
- Kết quả xét nghiệm, chẩn đoán hình ảnh

### Viện phí & thanh toán
- Tính giá dịch vụ theo đối tượng (BHYT, dịch vụ, miễn phí)
- Phụ thu (ngoài giờ, phẫu thuật, ngày lễ)
- Thanh toán: tiền mặt, thẻ, QR (Vietinbank, PVCB, Napas)
- Hoàn ứng, tạm ứng

### BHYT & báo cáo
- Tổng hợp dữ liệu BHYT
- Xuất XML TT12 (Mẫu 03, Mẫu 04)
- Xuất XML QĐ130

### Dược
- Kê đơn thuốc, vật tư y tế
- Cấp phát kho, nhập kho, xuất kho
- Tồn kho toàn viện

---

## Cấu trúc code

```
BACKEND/MOS/
├── HIS.Core/
│   ├── Manager/        ← Business logic
│   ├── DAO/            ← Data access
│   ├── EFMODEL/        ← Entity Framework models (HIS_*.cs)
│   ├── SDO/            ← Search/filter DTOs
│   └── TDO/            ← Transfer DTOs
└── HIS.API/
    └── Controllers/    ← REST endpoints
```

---

## API Pattern

```
GET  /api/{Entity}/Get        → Lấy 1 bản ghi
POST /api/{Entity}/GetList    → Lấy danh sách (có filter)
POST /api/{Entity}/Create     → Tạo mới
POST /api/{Entity}/CreateList → Tạo batch
POST /api/{Entity}/Update     → Cập nhật
POST /api/{Entity}/Delete     → Soft delete
```

Xem chi tiết → [API Conventions](../../design-patterns/api-conventions) · [API Overview](api-overview)

---

## Entities chính

| Entity | Table | Mô tả |
|--------|-------|-------|
| HisPatient | HIS_PATIENT | Hồ sơ bệnh nhân |
| HisTreatment | HIS_TREATMENT | Đợt điều trị |
| HisService | HIS_SERVICE | Danh mục dịch vụ |
| HisServiceReq | HIS_SERVICE_REQ | Chỉ định dịch vụ |
| HisTransaction | HIS_TRANSACTION | Giao dịch viện phí |
| HisMedicine | HIS_MEDICINE | Danh mục thuốc/VTYT |
| HisExpMest | HIS_EXP_MEST | Phiếu xuất kho |
| HisImpMest | HIS_IMP_MEST | Phiếu nhập kho |
