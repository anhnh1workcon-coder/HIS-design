# 5 Subsystems HIS

## Bản đồ subsystems

```
BACKEND/
├── MOS/    ← HIS chính: khám, dược, viện phí, thanh toán
├── EMR/    ← Bệnh án điện tử, ký số
├── LIS/    ← Xét nghiệm
├── ACS/    ← Phân quyền
└── FSS/    ← Lưu trữ file
```

## MOS — Medical Operating System

**Path**: `BACKEND/MOS/`  
**Quy mô**: 525+ managers, 896 controllers

Hệ thống lõi HIS, xử lý toàn bộ nghiệp vụ bệnh viện:

| Nhóm chức năng | Mô tả |
|----------------|-------|
| Quản lý bệnh nhân | Tiếp đón, hồ sơ, lịch sử KCB |
| Khám bệnh | Chỉ định dịch vụ, kết quả |
| Dược | Kê đơn, cấp phát, tồn kho |
| Viện phí | Tính giá, phụ thu, thanh toán |
| BHYT | Tổng hợp, xuất XML TT12/QD130 |
| Kiosk | Đăng ký số, check-in tự động |

**Entity prefix**: `His*` (HisPatient, HisTreatment, HisService...)

---

## EMR — Electronic Medical Records

**Path**: `BACKEND/EMR/`

Quản lý bệnh án điện tử với luồng ký số và phê duyệt:

| Feature Module | Mô tả |
|----------------|-------|
| EmrDocument | Tạo, lưu, tra cứu bệnh án |
| EmrSign | Ký số điện tử (HSM, USB token) |
| EmrSignFlow | Luồng ký duyệt nhiều cấp |
| EmrBhyt | Tích hợp BHYT trên bệnh án |
| EmrTreatment | Thông tin điều trị, phẫu thuật |
| EmrViewer | Hiển thị bệnh án dạng HTML |
| EmrConfig | Cấu hình mẫu bệnh án |

**Entity prefix**: `Emr*`

---

## LIS — Laboratory Information System

**Path**: `BACKEND/LIS/`  
**Quy mô**: 40 managers

Quản lý xét nghiệm từ chỉ định đến trả kết quả:

| Chức năng | Mô tả |
|-----------|-------|
| Mẫu xét nghiệm | Tiếp nhận, phân loại, lưu trữ |
| Kết nối máy | Interface máy xét nghiệm (Labconn) |
| Kết quả | Nhập kết quả, phê duyệt, trả |
| Cảnh báo | Panic value, tương tác thuốc (MIMS) |

**Entity prefix**: `Lis*`

---

## ACS — Access Control System

**Path**: `BACKEND/ACS/`

Quản lý phân quyền tập trung cho toàn hệ thống:

| Chức năng | Mô tả |
|-----------|-------|
| User | Tài khoản, thông tin nhân viên |
| Role | Vai trò (Bác sĩ, Điều dưỡng, Thu ngân...) |
| Module | Danh sách chức năng được phép |
| Token | TokenCode SHA256 xác thực API |

**Entity prefix**: `Acs*`  
**Auth**: `TokenCode` gửi qua HTTP header — không dùng session/cookie.

---

## FSS — File Storage System

**Path**: `BACKEND/FSS/`

Lưu trữ file tập trung:

| Loại file | Mô tả |
|-----------|-------|
| PDF | Bệnh án, phiếu kết quả, hóa đơn |
| XML | Dữ liệu BHYT xuất TT12 |
| Media | Ảnh, tài liệu đính kèm |

**Quy tắc**: Validate file type (whitelist) + validate file size trước khi lưu.

---

## Entity Prefix → Subsystem

| Prefix | Subsystem | Ví dụ |
|--------|-----------|-------|
| `His*` | MOS | HisPatient, HisTreatment |
| `Emr*` | EMR | EmrDocument, EmrSign |
| `Lis*` | LIS | LisSample, LisResult |
| `Acs*` | ACS | AcsUser, AcsRole |
