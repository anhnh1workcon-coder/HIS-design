# FSS — File Storage System

> Lưu trữ file tập trung cho toàn hệ thống HIS: PDF, XML, media.

**Path**: `BACKEND/FSS/`

---

## Chức năng chính

| Chức năng | Mô tả |
|-----------|-------|
| Upload file | Nhận file từ các subsystem khác |
| Download file | Trả file theo ID hoặc path |
| Quản lý metadata | Loại file, size, owner, ngày tạo |
| Validate | Kiểm tra type, size trước khi lưu |

---

## Các loại file

| Loại | Extension | Nguồn | Mô tả |
|------|-----------|-------|-------|
| Bệnh án PDF | `.pdf` | EMR | Bệnh án điện tử render ra PDF |
| XML BHYT | `.xml` | MOS | Dữ liệu BHYT TT12, QĐ130 |
| Kết quả XN | `.pdf`, `.png` | LIS | Phiếu kết quả xét nghiệm |
| Hóa đơn | `.pdf` | MOS | Hóa đơn viện phí |
| Ảnh | `.jpg`, `.png` | EMR | Ảnh đính kèm bệnh án |

---

## Quy tắc security (bắt buộc)

```csharp
// ✅ Validate file type — whitelist approach
var allowedTypes = new[] { ".pdf", ".xml", ".jpg", ".png" };
if (!allowedTypes.Contains(Path.GetExtension(fileName).ToLower()))
    return Error("File type not allowed");

// ✅ Validate file size
if (fileStream.Length > MAX_FILE_SIZE)
    return Error("File too large");
```

- Validate **trước khi lưu**, không sau
- Dùng whitelist extension, không blacklist
- Không expose file path vật lý qua API

---

## API

```
POST /api/FssFile/Upload    → Upload file, trả về FILE_ID
GET  /api/FssFile/Download  → Download theo FILE_ID
POST /api/FssFile/Delete    → Soft delete
```

File được trả về qua `FileStreamResult`, không expose đường dẫn vật lý.
