# EMR — Electronic Medical Records

> Bệnh án điện tử: tạo, lưu trữ, ký số, phê duyệt và xem bệnh án.

**Path**: `BACKEND/EMR/`  
**Entity prefix**: `Emr*`

---

## Chức năng chính

| Module | Mô tả |
|--------|-------|
| EmrDocument | Tạo, lưu, tra cứu bệnh án |
| EmrSign | Ký số điện tử (offline/online) |
| EmrSignFlow | Luồng ký duyệt nhiều cấp |
| EmrBhyt | Dữ liệu BHYT trên bệnh án |
| EmrTreatment | Thông tin điều trị, phẫu thuật, thủ thuật |
| EmrViewer | Hiển thị bệnh án dạng HTML có in |
| EmrConfig | Cấu hình mẫu bệnh án theo khoa/loại |
| EmrExamCategory | Phân loại bệnh án theo chuyên khoa |

---

## Luồng ký số

```
Bác sĩ soạn bệnh án
      ↓
   EmrDocument (DRAFT)
      ↓
   Ký số (EmrSign)
      ↓ HSM / USB Token
   SIGNED
      ↓ (nếu cần duyệt)
   Trưởng khoa phê duyệt (EmrSignFlow)
      ↓
   APPROVED
```

Chi tiết → [Sign Flow](sign-flow)

---

## Cấu trúc Document

```json
{
  "DOCUMENT_ID": 10001,
  "TREATMENT_ID": 5001,
  "DOCUMENT_TYPE_ID": 3,
  "DOCUMENT_TIME": 20260518083000,
  "CREATOR_ID": 200,
  "SIGN_STATUS": 1,
  "IS_ACTIVE": 1,
  "IS_DELETE": 0
}
```

### SIGN_STATUS values

| Value | Trạng thái |
|-------|-----------|
| 0 | Chưa ký |
| 1 | Đã ký (bác sĩ) |
| 2 | Đã phê duyệt (trưởng khoa) |
| -1 | Từ chối |

---

## Entities chính

| Entity | Table | Mô tả |
|--------|-------|-------|
| EmrDocument | EMR_DOCUMENT | Bệnh án |
| EmrSign | EMR_SIGN | Thông tin ký số |
| EmrSignFlow | EMR_SIGN_FLOW | Cấu hình luồng ký |
| EmrVersion | EMR_VERSION | Lịch sử phiên bản bệnh án |
| EmrConfig | EMR_CONFIG | Cấu hình mẫu bệnh án |

---

## Quy tắc nghiệp vụ quan trọng

1. **Bệnh án đã ký không được sửa nội dung** — phải tạo phiên bản mới
2. **Chữ ký số lưu tách biệt** khỏi nội dung bệnh án
3. **EmrViewer** render HTML từ XML template + dữ liệu bệnh án
4. **Multi-site**: mỗi bệnh viện có cấu hình mẫu riêng qua EmrConfig
