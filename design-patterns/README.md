# Design Patterns — HIS

Các quy ước và pattern thiết kế áp dụng xuyên suốt toàn bộ hệ thống HIS.

## Danh sách

| Pattern | Mô tả |
|---------|-------|
| [API Conventions](api-conventions) | Cấu trúc API, auth, request/response, naming |
| [Database Patterns](database-patterns) | Soft delete, datetime, multi-site, naming |
| [Frontend Patterns](frontend-patterns) | Plugin architecture, WinForms, API consumer |

## Tại sao cần pattern chuẩn?

HIS phục vụ **nhiều bệnh viện** trên cùng một codebase với hơn **500 developers** (trong vòng đời dự án). Patterns chuẩn giúp:

1. **Backward compatible** — thay đổi mới không phá vỡ code cũ
2. **Multi-site safety** — tính năng bệnh viện A không ảnh hưởng B
3. **Predictable** — mọi API hoạt động cùng cách, dễ tích hợp
4. **Auditable** — dễ review bảo mật và compliance y tế

## Nguyên tắc cốt lõi

> **Không đoán nghiệp vụ y tế.** Mọi thay đổi logic phải có căn cứ từ code hiện tại hoặc xác nhận từ stakeholder.

> **Surgical changes.** Chỉ chạm vào những gì cần thiết. Không refactor code lân cận.
