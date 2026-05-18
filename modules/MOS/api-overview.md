# MOS — API Overview

## Xác thực

Mọi request phải gửi `TokenCode` qua HTTP header:

```
TokenCode: {SHA256-64-chars-token}
```

Token lấy từ ACS sau khi đăng nhập. Không dùng cookie, không truyền qua URL query string.

---

## Request / Response wrapper

**Request** — tất cả POST dùng body JSON:
```json
{
  "filter": { "PATIENT_CODE": "BN001", "IS_DELETE": 0 },
  "paging": { "pageIndex": 1, "pageSize": 50 }
}
```

**Response** — luôn wrap trong `ApiParam`:
```json
{
  "ResultCode": 200,
  "ResultMessage": "OK",
  "Data": [ ... ],
  "DataCount": 150
}
```

### ResultCode

| Code | Ý nghĩa |
|------|---------|
| 200 | Thành công |
| 400 | Bad request (validation failed) |
| 401 | Chưa xác thực / token hết hạn |
| 403 | Không có quyền |
| 500 | Lỗi server |

---

## Ví dụ: GetList với filter

```http
POST /api/HisPatient/GetList
TokenCode: abc123...

{
  "filter": {
    "PATIENT_NAME": "Nguyễn",
    "IS_DELETE": 0,
    "CREATE_TIME_FROM": 20260101000000,
    "CREATE_TIME_TO": 20260531235959
  },
  "paging": { "pageIndex": 1, "pageSize": 20 }
}
```

---

## Ví dụ: Create

```http
POST /api/HisTransaction/Create
TokenCode: abc123...

{
  "TREATMENT_ID": 123456,
  "AMOUNT": 150000,
  "PAYMENT_TYPE_ID": 1,
  "IS_DELETE": 0,
  "CREATE_TIME": 20260518094532
}
```

---

## Datetime convention

Tất cả datetime dùng `long` format `yyyyMMddHHmmss`:

```
2026-05-18 09:45:32  →  20260518094532
```

Lý do: tránh timezone issues, dễ so sánh, tương thích Oracle VARCHAR2.

---

## Batch create

Dùng `CreateList` thay vì loop `Create`:

```http
POST /api/HisServiceReq/CreateList
TokenCode: abc123...

[
  { "TREATMENT_ID": 1, "SERVICE_ID": 10, ... },
  { "TREATMENT_ID": 1, "SERVICE_ID": 11, ... }
]
```

---

## API Endpoints tham chiếu

File đầy đủ: `_Software-Specs/01_BaseDesign/MOS/Architecture/MOS_API_Endpoints.md` (72K)
