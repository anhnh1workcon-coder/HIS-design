# ACS — Access Control System

> Phân quyền tập trung cho toàn hệ thống HIS: user, role, module, token.

**Path**: `BACKEND/ACS/`  
**Entity prefix**: `Acs*`

---

## Chức năng chính

| Chức năng | Mô tả |
|-----------|-------|
| Quản lý tài khoản | Tạo, sửa, khóa user |
| Phân quyền theo role | Gán role cho user |
| Quản lý module | Danh sách chức năng hệ thống |
| Phân quyền module | Role được phép truy cập module nào |
| Xác thực API | Phát hành TokenCode cho session |

---

## Mô hình phân quyền

```
User ──── has many ────► Role
Role ──── grants ──────► Module (ACS_MODULE)
Module ─── maps to ────► Desktop Plugin / API
```

---

## TokenCode — Xác thực API

```
1. Client POST /api/AcsUser/Login { username, password }
2. ACS tạo TokenCode (SHA256, 64 chars)
3. Client gửi TokenCode qua header mọi request:
   Header: TokenCode: {token}
4. Mỗi subsystem verify token qua ACS
```

### Quy tắc token
- Không log token ra file
- Không truyền token qua URL query string
- Token có thời hạn (config per hospital)

---

## Module Mapping

`BD_001_Module_Plugin_Mapping.md` là tài liệu chuẩn mapping:
- `ACS_MODULE.MODULE_CODE` ↔ `HIS.Desktop.Plugins.*`
- Dùng để kiểm tra plugin có tương ứng module phân quyền không

---

## Entities chính

| Entity | Table | Mô tả |
|--------|-------|-------|
| AcsUser | ACS_USER | Tài khoản người dùng |
| AcsRole | ACS_ROLE | Vai trò |
| AcsUserRole | ACS_USER_ROLE | Gán role cho user |
| AcsModule | ACS_MODULE | Danh mục chức năng |
| AcsRoleModule | ACS_ROLE_MODULE | Phân quyền role-module |
| AcsToken | ACS_TOKEN | Session token |
