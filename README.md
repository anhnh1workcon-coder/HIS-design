# HIS Design Portal

> **Hospital Information System** — Tài liệu thiết kế module chức năng phục vụ phân tích & thiết kế phần mềm

---

## Hệ thống HIS là gì?

HIS (Hospital Information System) là phần mềm quản lý bệnh viện tích hợp, gồm **5 subsystem backend** (.NET Framework 4.5 + Oracle) và **992 plugin desktop** (WinForms), phục vụ đồng thời nhiều bệnh viện trên cùng một codebase.

## Các module chính

| Module | Mô tả | Quy mô |
|--------|-------|--------|
| [**MOS**](modules/MOS/) | Quản lý khám chữa bệnh & viện phí | 525+ managers, 896 controllers |
| [**EMR**](modules/EMR/) | Bệnh án điện tử, ký số, phê duyệt | 9 feature modules |
| [**LIS**](modules/LIS/) | Xét nghiệm: mẫu, máy, kết quả | 40 managers |
| [**ACS**](modules/ACS/) | Phân quyền: user, role, token, module | — |
| [**FSS**](modules/FSS/) | Lưu trữ file: PDF, XML, media | — |

## Frontend

- **992 plugin modules** WinForms, mỗi plugin = 1 chức năng y tế cụ thể
- Path: `FRONTEND/hisnguonmo/HIS/Plugins/`
- 15 backend API consumers

## Bắt đầu từ đâu?

- **Kiến trúc tổng quan** → [Tổng quan hệ thống](overview/)
- **Thiết kế theo module** → [Modules](modules/MOS/)
- **Quy ước & pattern** → [Design Patterns](design-patterns/)

---

*Tài liệu này được duy trì bởi team phân tích thiết kế HIS — Inventec Vietnam.*
