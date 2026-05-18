# Database Patterns

## Soft Delete

**Không xóa vật lý** — dùng flag:

```sql
-- Soft delete
UPDATE HIS_PATIENT SET IS_DELETE = 1 WHERE PATIENT_ID = :id;

-- Deactivate
UPDATE HIS_SERVICE SET IS_ACTIVE = 0 WHERE SERVICE_ID = :id;
```

| Column | Giá trị | Ý nghĩa |
|--------|---------|---------|
| `IS_DELETE` | 0 | Bản ghi bình thường |
| `IS_DELETE` | 1 | Đã xóa (ẩn khỏi UI) |
| `IS_ACTIVE` | 1 | Đang hoạt động |
| `IS_ACTIVE` | 0 | Ngừng hoạt động |

**Lọc trong query phải luôn có**:
```csharp
query = query.Where(x => x.IS_DELETE == 0);
```

---

## Datetime — Long Format

Tất cả datetime lưu dạng `long` kiểu `yyyyMMddHHmmss`:

```csharp
// Ghi
long now = long.Parse(DateTime.Now.ToString("yyyyMMddHHmmss"));
// → 20260518094532

// Đọc
DateTime dt = DateTime.ParseExact(createTime.ToString(), "yyyyMMddHHmmss", null);
```

| Trường hợp | Value |
|-----------|-------|
| 2026-05-18 09:45:32 | 20260518094532 |
| Range từ: 2026-01-01 | 20260101000000 |
| Range đến: 2026-12-31 | 20261231235959 |

**Không dùng**: `DateTime` column trong Oracle, `TIMESTAMP`, string ISO 8601.

---

## Naming Convention

**Bảng**: UPPERCASE + underscore

```
HIS_PATIENT
EMR_DOCUMENT
LIS_SAMPLE
ACS_USER
```

**Column**: UPPERCASE + underscore

```
PATIENT_ID          ← PK
PATIENT_CODE        ← Business key
PATIENT_NAME
CREATE_TIME         ← long yyyyMMddHHmmss
MODIFY_TIME
CREATE_LOGIN_NAME
IS_DELETE
IS_ACTIVE
HOSPITAL_ID         ← Multi-site key
```

---

## Multi-site — HOSPITAL_ID

Mỗi bảng lưu trữ dữ liệu theo bệnh viện phải có `HOSPITAL_ID`:

```csharp
// Luôn filter theo hospital
query = query.Where(x => x.HOSPITAL_ID == currentHospitalId && x.IS_DELETE == 0);
```

Thêm feature mới cho 1 bệnh viện: **KHÔNG** dùng `HOSPITAL_ID` để phân nhánh logic → dùng **Config flag**.

---

## SQL Injection Prevention

Không bao giờ nối chuỗi SQL:

```csharp
// ❌ SAI — SQL Injection
string sql = "SELECT * FROM HIS_PATIENT WHERE PATIENT_NAME = '" + name + "'";

// ✅ ĐÚNG — Entity Framework LINQ
var result = db.HIS_PATIENT
    .Where(x => x.PATIENT_NAME.Contains(name) && x.IS_DELETE == 0)
    .ToList();

// ✅ ĐÚNG — Parameterized query (nếu phải dùng raw SQL)
db.Database.SqlQuery<HIS_PATIENT>("SELECT * FROM HIS_PATIENT WHERE PATIENT_NAME = :name",
    new OracleParameter("name", name));
```

---

## ALTER TABLE — Backward Compatible

Khi thêm column mới:

```sql
-- ✅ Cho phép NULL (backward compatible)
ALTER TABLE HIS_PATIENT ADD NEW_COLUMN VARCHAR2(100) NULL;

-- ❌ Không được NOT NULL (sẽ fail với data cũ)
ALTER TABLE HIS_PATIENT ADD NEW_COLUMN VARCHAR2(100) NOT NULL;

-- ❌ Không đổi kiểu column đang có
ALTER TABLE HIS_PATIENT MODIFY PATIENT_CODE NUMBER; -- có thể break code
```

---

## PK Convention

```sql
-- Oracle sequence
CREATE SEQUENCE SEQ_HIS_PATIENT START WITH 1 INCREMENT BY 1;

-- Hoặc dùng trong EFMODEL
[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
public long PATIENT_ID { get; set; }
```
