# frmTransactionBill — Màn hình Thanh toán

**Module**: MOS · `HIS.Desktop.Plugins.TransactionBill`  
**Loại màn hình**: Thanh toán viện phí (nội trú / ngoại trú)  
**Kích thước**: 1841 × 938 px · DevExpress XtraForm / Office 2019 Colorful

[Xem mockup toàn màn hình](mockups/frmTransactionBill_mockup.html ':ignore')

---

## Mockup

<div style="border:1px solid #ccc; border-radius:6px; overflow:hidden; margin: 1em 0;">
  <div style="background:#2e75b8; color:#fff; padding:6px 12px; font-size:12px; font-weight:600;">
    Preview — frmTransactionBill (cuộn ngang để xem đầy đủ)
  </div>
  <div style="overflow:auto; max-height:600px;">
    <iframe
      src="mockups/frmTransactionBill_mockup.html"
      width="1900"
      height="980"
      style="border:none; display:block;"
      title="frmTransactionBill mockup"
    ></iframe>
  </div>
</div>

---

## Mô tả chức năng

### 1. Thông tin bệnh nhân (Patient info bar)
Hiển thị thông tin đợt điều trị hiện tại:
- Mã BN, Tên BN, Đối tượng (BHYT/DV/MG)
- Số thẻ BHYT, hạn thẻ, mức hưởng
- Khoa, Phòng, Bác sĩ điều trị

### 2. Danh sách dịch vụ (Services tree)
Grid dạng cây — nhóm theo loại dịch vụ:
- **Phí khám bệnh**
- **Cận lâm sàng + Thủ thuật**
- **Thuốc – Vật tư y tế**
- **Tiền giường**

Mỗi dòng hiển thị: SL, Đơn giá, Thành tiền, BHYT trả, BN trả, Đã thu, Còn nợ.

### 3. Chi tiết thanh toán (Left column)

| Trường | Mô tả |
|--------|-------|
| Sổ thu chi | Chọn sổ quỹ |
| Số tiền / Cần thu | Auto-tính từ dịch vụ chọn |
| Hình thức | Tiền mặt / Chuyển khoản / QR / Kết hợp |
| Ngân hàng | Chọn ngân hàng CK |
| Chiết khấu | Số tiền hoặc % |
| Quỹ hỗ trợ | Grid quỹ từ thiện/hỗ trợ áp dụng |
| Tạm ứng / Hoàn ứng | Sổ tạm ứng, hoàn ứng tự động |

### 4. Thông tin người mua HĐĐT (Right column)
Dùng cho hóa đơn điện tử:
- Họ tên, Email, SĐT, CCCD/CMND
- Địa chỉ (đồng bộ từ BHYT hoặc nhập tay)

### 5. Lịch sử giao dịch
Grid danh sách giao dịch đã lưu trong đợt:
- Khóa / Mở khóa giao dịch
- Thời gian tạo / sửa, người thực hiện

### 6. Bottom bar — Tùy chọn in & lưu
- Checkbox: In HĐĐT, In phiếu hoàn ứng, In bảng kê BH, POS...
- Buttons: **Lưu**, Lưu in, Lưu ký, Mới

---

## Toolbar buttons

| Button | Shortcut | Mô tả |
|--------|----------|-------|
| Lưu | Ctrl+S | Lưu giao dịch thanh toán |
| Mới | Ctrl+N | Tạo giao dịch mới |
| Lưu in | Ctrl+I | Lưu + in phiếu ngay |
| Lưu ký | Ctrl+A | Lưu + ký số bệnh án |
| Tìm | Ctrl+F | Tìm kiếm giao dịch |

---

## Hình thức thanh toán

| Hình thức | Mô tả |
|-----------|-------|
| Tiền mặt | Thu trực tiếp |
| Chuyển khoản | Nhập số tiền CK + ngân hàng |
| QR | Tạo QR Vietinbank/PVCB/Napas |
| POS | Kết nối máy POS |
| Kết hợp | Nhiều hình thức cùng lúc |

---

## Entities liên quan

| Entity | Vai trò |
|--------|---------|
| `HisTransaction` | Giao dịch viện phí |
| `HisTreatment` | Đợt điều trị |
| `HisServiceReq` | Danh sách dịch vụ chỉ định |
| `HisPatient` | Thông tin bệnh nhân |
| `HisBillFund` | Quỹ hỗ trợ áp dụng |
| `HisAdvancePayment` | Tạm ứng / Hoàn ứng |
