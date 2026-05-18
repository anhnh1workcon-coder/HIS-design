# Kiến trúc hệ thống HIS

## Tổng quan

HIS là hệ thống phần mềm quản lý bệnh viện đa tầng, kiến trúc **Client-Server** với backend REST API và frontend WinForms desktop.

```
┌──────────────────────────────────────────────────────────┐
│                   HIS Desktop (WinForms)                  │
│           992 Plugins — HIS.Desktop.Plugins.*             │
│           15 API Consumers                                │
└──────────────┬───────────────────────────────────────────┘
               │ HTTP REST (JSON)
┌──────────────┴───────────────────────────────────────────┐
│                    Backend APIs (.NET 4.5)                 │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  │
│  │  MOS  │  │  EMR  │  │  LIS  │  │  ACS  │  │  FSS  │  │
│  └───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘  │
└──────┼──────────┼──────────┼──────────┼──────────┼───────┘
       └──────────┴──────────┴──────────┴──────────┘
                              │
                    ┌─────────┴────────┐
                    │  Oracle Database  │
                    └──────────────────┘
```

## Nguyên tắc kiến trúc

### 1. Manager Pattern
Business logic tập trung ở `*Manager.cs` — Controller chỉ validate + delegate.

```
Controller → Manager → DAO → Entity Framework → Oracle DB
```

### 2. Multi-site Safety
Mỗi bệnh viện dùng chung codebase. Tính năng mới luôn đặt sau **config flag** (mặc định tắt).

### 3. Soft Delete
Không xóa vật lý — dùng `IS_DELETE = 1` hoặc `IS_ACTIVE = 0`.

### 4. Datetime Format
Tất cả datetime lưu dạng `long` format `yyyyMMddHHmmss`.

## Tầng kiến trúc Backend

| Tầng | Class | Vai trò |
|------|-------|---------|
| Controller | `*Controller.cs` | Nhận request, validate, trả response |
| Manager | `*Manager.cs` | Business logic |
| DAO | `*DAO.cs` | Data access (EF LINQ) |
| EFMODEL | `HIS_*.cs` | Entity mapping với Oracle table |
| SDO | `*SDO.cs` | Search/filter DTO (input) |
| TDO | `*TDO.cs` | Transfer DTO (output) |

## API Response Format

Tất cả API trả về wrapper `ApiParam`:

```json
{
  "ResultCode": 200,
  "ResultMessage": "OK",
  "Data": { ... }
}
```

Xem chi tiết → [API Conventions](../design-patterns/api-conventions)
