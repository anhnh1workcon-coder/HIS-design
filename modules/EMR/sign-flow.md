# EMR — Luồng Ký Số

## Tổng quan

HIS hỗ trợ 2 hình thức ký số:

| Hình thức | Mô tả |
|-----------|-------|
| Ký online (HSM) | Ký qua HSM server — phổ biến |
| Ký offline | Ký bằng USB token tại máy trạm |

---

## Luồng ký chuẩn (Online HSM)

```
1. Bác sĩ soạn xong bệnh án
       ↓
2. POST /api/EmrSign/SignDocument
   { documentId, signType: "HSM" }
       ↓
3. EmrSign Manager:
   a. Lấy nội dung bệnh án (hash SHA256)
   b. Gọi HSM service ký
   c. Lưu signature vào EMR_SIGN
   d. Cập nhật EMR_DOCUMENT.SIGN_STATUS = 1
       ↓
4. Nếu cần phê duyệt → EmrSignFlow
```

---

## EmrSignFlow — Luồng phê duyệt nhiều cấp

Cấu hình linh hoạt theo bệnh viện:

```
Cấp 1: Bác sĩ ký        (bắt buộc)
Cấp 2: Trưởng khoa duyệt (tùy cấu hình)
Cấp 3: Giám đốc duyệt    (tùy cấu hình)
```

### Bảng EMR_SIGN_FLOW

| Column | Type | Mô tả |
|--------|------|-------|
| FLOW_ID | NUMBER | PK |
| DOCUMENT_TYPE_ID | NUMBER | Loại bệnh án |
| STEP_ORDER | NUMBER | Thứ tự bước |
| ROLE_ID | NUMBER | Role được ký bước này |
| IS_REQUIRED | NUMBER | 1 = bắt buộc, 0 = tùy chọn |
| HOSPITAL_ID | NUMBER | Multi-site |

---

## Ký lại / Hủy ký

| Thao tác | Điều kiện | API |
|----------|-----------|-----|
| Ký lại | Đã ký nhưng chưa phê duyệt | `POST /api/EmrSign/ReSign` |
| Hủy ký | Trưởng khoa từ chối | `POST /api/EmrSign/CancelSign` |
| Khóa bệnh án | Sau khi phê duyệt cuối | Tự động |

---

## Security

- Mỗi chữ ký lưu kèm: `SIGNER_ID`, `SIGN_TIME`, `CERTIFICATE_SERIAL`, `SIGNATURE_VALUE`
- Không log `SIGNATURE_VALUE` ra file log
- Không truyền token ký qua URL query string
