# Frontend Patterns

## Plugin Architecture

HIS Desktop gồm **992 plugin modules** — mỗi plugin = 1 chức năng y tế cụ thể.

```
FRONTEND/hisnguonmo/HIS/
├── Plugins/
│   ├── HIS.Desktop.Plugins.{PluginName}/
│   │   ├── frmMain.cs          ← WinForms form chính
│   │   ├── frmMain.Designer.cs ← Auto-generated layout
│   │   └── frmMain.resx
│   └── ...
├── HIS.Desktop.Common/         ← Base classes dùng chung
└── HIS.Desktop.ApiConsumer/    ← 15 API consumer classes
    ├── MOS/
    ├── EMR/
    ├── LIS/
    └── ACS/
```

---

## API Consumer Pattern

Plugin không gọi HTTP trực tiếp — dùng qua API Consumer:

```csharp
// ✅ Đúng — qua ApiConsumer
var consumer = new HisPatientApiConsumer();
var result = consumer.GetList(new HisPatientSDO { PATIENT_CODE = "BN001" });

// ❌ Sai — gọi HTTP trực tiếp trong plugin
var http = new HttpClient();
http.GetAsync("http://api/HisPatient/GetList");
```

15 API consumers trong `HIS.Desktop.ApiConsumer/` bao gồm tất cả entity cần thiết.

---

## WinForms Naming Convention

| Control | Prefix | Ví dụ |
|---------|--------|-------|
| TextBox | `txt` | `txtMaBenhNhan` |
| Button | `btn` | `btnLuu`, `btnTim` |
| GridControl (DevExpress) | `gc` | `gcBenhNhan` |
| GridView | `gv` | `gvBenhNhan` |
| Label | `lbl` | `lblTenBenhNhan` |
| ComboBox / LookUpEdit | `lue` | `lueKhoa` |
| DateEdit | `de` | `deNgayVao` |
| SpinEdit | `se` | `seSoLuong` |

---

## Tạo plugin mới

Dùng skill `/fe-create-plugin` để scaffold plugin chuẩn:

1. Form chính kế thừa `FrmHisBase` hoặc `FrmDmdBase`
2. Load data trong `LoadData()` override
3. Save trong `Save()` override
4. Validate trong `Validate()` override

```csharp
public partial class frmMain : FrmHisBase
{
    protected override void LoadData()
    {
        var data = _consumer.GetList(BuildFilter());
        gcMain.DataSource = data;
    }

    protected override bool Validate()
    {
        if (string.IsNullOrEmpty(txtCode.Text))
        { ShowError("Mã không được để trống"); return false; }
        return true;
    }
}
```

---

## Module-Plugin Mapping

Mỗi plugin phải được map với `ACS_MODULE`:

- Tài liệu chuẩn: `BD_001_Module_Plugin_Mapping.md`
- Module code trong `ACS_MODULE.MODULE_CODE`
- Plugin path: `HIS.Desktop.Plugins.{Name}`

Nếu plugin không có module tương ứng → **không hiển thị trên menu** của user chưa được phân quyền.

---

## Import Excel — Pattern chuẩn

Plugin nhập khẩu Excel theo pattern `HisImportService`:

| Bước | Button | Mô tả |
|------|--------|-------|
| 1 | Tải template | Download file Excel mẫu |
| 2 | Chọn file | Upload file Excel đã điền |
| 3 | Lọc lỗi | Hiển thị dòng lỗi validation |
| 4 | Lưu | Gọi `CreateList` API |

Xem chi tiết: skill `/import-plugin-design`
