# API Conventions

## Xác thực

Tất cả API (trừ login) yêu cầu `TokenCode` qua HTTP header:

```http
POST /api/HisPatient/GetList
TokenCode: a1b2c3d4...{64 chars SHA256}
Content-Type: application/json
```

- Token lấy từ ACS sau đăng nhập
- Không truyền qua URL query string
- Không log token ra file

---

## Response Wrapper — ApiParam

Mọi response đều wrap trong `ApiParam`:

```json
{
  "ResultCode": 200,
  "ResultMessage": "OK",
  "Data": [ ... ],
  "DataCount": 50
}
```

Khi lỗi:
```json
{
  "ResultCode": 400,
  "ResultMessage": "PATIENT_CODE không được để trống",
  "Data": null
}
```

---

## URL Pattern

```
GET  /api/{Entity}/Get            → 1 bản ghi (by ID)
POST /api/{Entity}/GetList        → Danh sách có filter + paging
POST /api/{Entity}/Create         → Tạo mới 1 bản ghi
POST /api/{Entity}/CreateList     → Tạo batch nhiều bản ghi
POST /api/{Entity}/Update         → Cập nhật 1 bản ghi
POST /api/{Entity}/Delete         → Soft delete
```

Không dùng: `ImportXxx`, `BulkCreate`, `AddRange` — thay bằng `CreateList`.

---

## SDO — Search/Filter DTO

SDO là input object cho `GetList`:

```csharp
public class HisPatientSDO
{
    public string PATIENT_CODE { get; set; }
    public string PATIENT_NAME { get; set; }
    public long? CREATE_TIME_FROM { get; set; }
    public long? CREATE_TIME_TO { get; set; }
    public int? IS_DELETE { get; set; }
    // Field mới phải nullable
    public bool? IS_NEW_FILTER { get; set; }
}
```

**Quy tắc**: Tất cả field SDO phải **nullable** — API cũ không gửi field vẫn hoạt động.

---

## TDO — Transfer DTO (Output)

TDO là output object trả về client:

```csharp
public class HisPatientTDO
{
    public long PATIENT_ID { get; set; }
    public string PATIENT_CODE { get; set; }
    public string PATIENT_NAME { get; set; }
    // Thêm field mới: phải nullable
    public string NEW_FIELD { get; set; }
}
```

**Quy tắc**: Field mới thêm vào TDO phải nullable + không gây compile error ở consumer cũ.

---

## Backward Compatibility

| Thao tác | Allowed | Lý do |
|----------|---------|-------|
| Thêm field nullable vào TDO | ✅ | API cũ ignore field mới |
| Thêm endpoint mới | ✅ | Không ảnh hưởng endpoint cũ |
| Đổi tên field TDO | ❌ | Phá vỡ client hiện có |
| Đổi kiểu field TDO | ❌ | Phá vỡ deserialization |
| Xóa field TDO | ❌ | Client cũ sẽ lỗi |
| Đổi URL pattern | ❌ | Phá vỡ consumer |

---

## Multi-site Safety

Tính năng mới cho 1 bệnh viện phải đặt sau **config flag**:

```csharp
int cfgNewFeature = ConfigUtil.GetIntConfig("MOS.HIS_TREATMENT.NEW_FEATURE");
if (cfgNewFeature == 1)
{
    // Logic tính năng mới — chỉ chạy khi bệnh viện bật config
}
// Bệnh viện khác: cfgNewFeature = 0 → skip hoàn toàn, zero overhead
```

Config mặc định = **0 (tắt)**.

---

## Naming Conventions

| Thành phần | Pattern | Ví dụ |
|-----------|---------|-------|
| Controller | `{Entity}Controller.cs` | `HisPatientController.cs` |
| Manager | `{Entity}Manager.cs` | `HisPatientManager.cs` |
| DAO | `{Entity}DAO.cs` | `HisPatientDAO.cs` |
| EFMODEL | `HIS_{TABLE}.cs` | `HIS_PATIENT.cs` |
| SDO | `{Entity}SDO.cs` | `HisPatientSDO.cs` |
| TDO | `{Entity}TDO.cs` | `HisPatientTDO.cs` |
| Async method | `{Method}Async` | `GetPatientAsync` |
