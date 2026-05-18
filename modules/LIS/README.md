# LIS — Laboratory Information System

> Quản lý xét nghiệm: từ chỉ định đến trả kết quả, kết nối máy xét nghiệm.

**Path**: `BACKEND/LIS/`  
**Quy mô**: 40 managers  
**Entity prefix**: `Lis*`

---

## Chức năng chính

| Chức năng | Mô tả |
|-----------|-------|
| Tiếp nhận mẫu | Nhận mẫu từ MOS, gán barcode, phân loại |
| Phân công | Chỉ định máy xét nghiệm cụ thể |
| Kết nối máy (Labconn) | Interface máy tự động qua HL7/middleware |
| Nhập kết quả thủ công | Điều dưỡng/kỹ thuật viên nhập |
| Phê duyệt kết quả | Bác sĩ xét nghiệm duyệt trước khi trả |
| Trả kết quả | Trả về MOS cho bác sĩ lâm sàng |
| Cảnh báo | Panic value, khoảng tham chiếu |

---

## Luồng xét nghiệm

```
MOS: Chỉ định XN (HisServiceReq)
        ↓ API callback
LIS: Tạo mẫu (LisSample)
        ↓
LIS: Barcode, phân loại, phân công máy
        ↓
Máy xét nghiệm (Labconn / nhập tay)
        ↓
LIS: Kết quả thô (LisResult)
        ↓
LIS: Bác sĩ phê duyệt
        ↓
LIS: Trả kết quả → MOS
```

---

## Kết nối máy xét nghiệm

LIS kết nối máy qua **Labconn middleware**:

- Labconn nhận kết quả từ máy → gọi API LIS
- LIS map mã xét nghiệm máy → mã dịch vụ HIS (LIS_MACHINE_MAP)
- Hỗ trợ nhiều máy cùng lúc, mỗi máy có mã định danh riêng

### Giới hạn mã máy
`LIS_MACHINE.MACHINE_CODE` — xem PTTK_42586 về mở rộng độ dài.

---

## Entities chính

| Entity | Table | Mô tả |
|--------|-------|-------|
| LisSample | LIS_SAMPLE | Mẫu xét nghiệm |
| LisResult | LIS_RESULT | Kết quả |
| LisServiceMap | LIS_SERVICE_MAP | Map dịch vụ MOS ↔ LIS |
| LisMachine | LIS_MACHINE | Thông tin máy xét nghiệm |
| LisMachineMap | LIS_MACHINE_MAP | Map mã máy ↔ mã dịch vụ |

---

## Tích hợp MIMS (Cảnh báo tương tác thuốc)

Module cảnh báo độc lập, tham chiếu từ PTTK_29777:
- Map ATC code (MIMS) ↔ Hoạt chất (HIS)
- Cảnh báo khi kê đơn trùng nhóm hoạt chất
