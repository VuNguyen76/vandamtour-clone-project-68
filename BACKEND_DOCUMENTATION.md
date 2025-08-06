# Tài liệu Backend - Hệ thống Taxi Vân Đăm Tour

## Tổng quan dự án
Hệ thống quản lý taxi với các chức năng:
- **Frontend**: Trang web booking taxi cho khách hàng
- **Admin Panel**: Quản lý toàn bộ hệ thống
- **Backend**: API endpoints, database, authentication, file upload

## Công nghệ đề xuất cho Backend
- **Framework**: Node.js với Express.js hoặc NestJS
- **Database**: PostgreSQL (recommended) hoặc MySQL
- **ORM**: Prisma hoặc TypeORM
- **Authentication**: JWT tokens
- **File Storage**: Cloudinary hoặc AWS S3
- **Real-time**: Socket.io (cho notifications)
- **Email Service**: Nodemailer với Gmail/SendGrid
- **SMS Service**: Twilio hoặc Esms.vn (cho thị trường VN)

---

## 1. Database Schema

### Bảng Users (Tài khoản người dùng)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'editor', 'user') DEFAULT 'user',
  status ENUM('active', 'inactive') DEFAULT 'active',
  avatar_url VARCHAR(500),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bảng Bookings (Đặt xe)
```sql
CREATE TABLE bookings (
  id VARCHAR(50) PRIMARY KEY, -- Format: BK001, BK002...
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  service_type ENUM('taxi-gia-re', 'taxi-duong-dai', 'taxi-hop-dong', 'dua-don-san-bay') NOT NULL,
  vehicle_type ENUM('4seats', '7seats', '9seats', '16seats') NOT NULL,
  trip_type ENUM('oneway', 'roundtrip') DEFAULT 'oneway',
  pickup_location VARCHAR(500) NOT NULL,
  destination VARCHAR(500) NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  return_date DATE NULL,
  return_time TIME NULL,
  status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  price DECIMAL(10,2),
  driver_id INT NULL,
  driver_name VARCHAR(255),
  license_plate VARCHAR(20),
  special_requests TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES drivers(id)
);
```

### Bảng Drivers (Tài xế)
```sql
CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  license_number VARCHAR(50) NOT NULL,
  license_expiry DATE NOT NULL,
  vehicle_type ENUM('4seats', '7seats', '9seats', '16seats') NOT NULL,
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  vehicle_model VARCHAR(255),
  vehicle_year INT,
  status ENUM('active', 'inactive', 'busy') DEFAULT 'active',
  rating DECIMAL(3,2) DEFAULT 5.00,
  total_trips INT DEFAULT 0,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bảng News (Tin tức)
```sql
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  category ENUM('Tin công ty', 'Khuyến mãi', 'Hướng dẫn', 'Sự kiện', 'Thông báo') NOT NULL,
  status ENUM('draft', 'published') DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  featured_image VARCHAR(500),
  views INT DEFAULT 0,
  publish_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### Bảng Settings (Cấu hình website)
```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL, -- 'hero', 'services', 'pricing', 'contact'
  key_name VARCHAR(100) NOT NULL,
  value TEXT,
  data_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_section_key (section, key_name)
);
```

### Bảng Media (Quản lý file)
```sql
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size INT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  category ENUM('image', 'document', 'video', 'other') DEFAULT 'image',
  uploaded_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
```

### Bảng Pricing (Bảng giá)
```sql
CREATE TABLE pricing (
  id SERIAL PRIMARY KEY,
  vehicle_type ENUM('4seats', '7seats', '9seats', '16seats') NOT NULL,
  distance_from INT NOT NULL, -- km
  distance_to INT, -- km (NULL = unlimited)
  price_per_km DECIMAL(8,2) NOT NULL,
  base_price DECIMAL(10,2),
  description VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 2. API Endpoints

### Authentication APIs
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Booking APIs (Public)
```
POST /api/bookings                    # Tạo đặt xe mới
GET  /api/bookings/:id                # Lấy thông tin đặt xe (public với booking ID)
PUT  /api/bookings/:id/cancel         # Hủy đặt xe
```

### Admin Booking APIs
```
GET  /api/admin/bookings              # Danh sách đặt xe (có filter, search)
GET  /api/admin/bookings/:id          # Chi tiết đặt xe
PUT  /api/admin/bookings/:id          # Cập nhật đặt xe
PUT  /api/admin/bookings/:id/status   # Cập nhật trạng thái
DELETE /api/admin/bookings/:id        # Xóa đặt xe
```

### User Management APIs
```
GET  /api/admin/users                 # Danh sách users
GET  /api/admin/users/:id             # Chi tiết user
POST /api/admin/users                 # Tạo user mới
PUT  /api/admin/users/:id             # Cập nhật user
DELETE /api/admin/users/:id           # Xóa user
PUT  /api/admin/users/:id/status      # Thay đổi trạng thái
```

### Driver Management APIs
```
GET  /api/admin/drivers               # Danh sách tài xế
GET  /api/admin/drivers/:id           # Chi tiết tài xế
POST /api/admin/drivers               # Thêm tài xế mới
PUT  /api/admin/drivers/:id           # Cập nhật tài xế
DELETE /api/admin/drivers/:id         # Xóa tài xế
PUT  /api/admin/drivers/:id/status    # Thay đổi trạng thái tài xế
```

### News APIs
```
GET  /api/news                        # Danh sách tin công khai
GET  /api/news/:slug                  # Chi tiết tin theo slug
GET  /api/news/featured               # Tin nổi bật

GET  /api/admin/news                  # Quản lý tin tức
POST /api/admin/news                  # Tạo tin mới
PUT  /api/admin/news/:id              # Cập nhật tin
DELETE /api/admin/news/:id            # Xóa tin
PUT  /api/admin/news/:id/publish      # Xuất bản tin
```

### Media Management APIs
```
GET  /api/admin/media                 # Danh sách file
POST /api/admin/media/upload          # Upload file
DELETE /api/admin/media/:id           # Xóa file
```

### Settings APIs
```
GET  /api/admin/settings/:section     # Lấy cấu hình theo section
PUT  /api/admin/settings/:section     # Cập nhật cấu hình
```

### Pricing APIs
```
GET  /api/pricing                     # Bảng giá công khai
GET  /api/admin/pricing               # Quản lý bảng giá
POST /api/admin/pricing               # Thêm giá mới
PUT  /api/admin/pricing/:id           # Cập nhật giá
DELETE /api/admin/pricing/:id         # Xóa giá
```

### Dashboard APIs
```
GET  /api/admin/dashboard/stats       # Thống kê tổng quan
GET  /api/admin/dashboard/bookings    # Đặt xe gần đây
GET  /api/admin/dashboard/revenue     # Doanh thu
```

---

## 3. Request/Response Examples

### POST /api/bookings (Tạo đặt xe)
**Request:**
```json
{
  "customer_name": "Nguyễn Văn A",
  "customer_phone": "0901234567",
  "customer_email": "customer@email.com",
  "service_type": "taxi-gia-re",
  "vehicle_type": "4seats",
  "trip_type": "oneway",
  "pickup_location": "146 Nguyễn Xiển, Thanh Xuân",
  "destination": "Sân bay Nội Bài",
  "pickup_date": "2024-12-16",
  "pickup_time": "06:00",
  "special_requests": "Cần xe sạch sẽ"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "BK001",
    "customer_name": "Nguyễn Văn A",
    "status": "pending",
    "estimated_price": 450000,
    "booking_code": "BK001"
  },
  "message": "Đặt xe thành công. Chúng tôi sẽ liên hệ trong 5 phút."
}
```

### GET /api/admin/bookings (Danh sách đặt xe)
**Query Parameters:**
```
?page=1&limit=10&status=pending&search=Nguyen&date_from=2024-12-01&date_to=2024-12-31
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "BK001",
        "customer_name": "Nguyễn Văn A",
        "customer_phone": "0901234567",
        "service_type": "taxi-gia-re",
        "pickup_location": "146 Nguyễn Xiển",
        "destination": "Sân bay Nội Bài",
        "pickup_date": "2024-12-16",
        "pickup_time": "06:00",
        "status": "pending",
        "price": 450000,
        "created_at": "2024-12-15T10:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 50,
      "items_per_page": 10
    }
  }
}
```

---

## 4. Authentication & Authorization

### JWT Token Structure
```json
{
  "user_id": 1,
  "email": "admin@vandamtour.com",
  "role": "admin",
  "iat": 1639123456,
  "exp": 1639209856
}
```

### Role-based Access Control
- **admin**: Toàn quyền
- **manager**: Quản lý bookings, drivers, content
- **editor**: Chỉ quản lý content (news, media)
- **user**: Chỉ xem thông tin cá nhân

### Middleware Protection
```javascript
// Bảo vệ admin routes
app.use('/api/admin', authenticateToken, authorizeRoles(['admin', 'manager']));

// Bảo vệ content management
app.use('/api/admin/news', authenticateToken, authorizeRoles(['admin', 'manager', 'editor']));
```

---

## 5. Business Logic

### Pricing Calculation
```javascript
function calculatePrice(vehicleType, distance, tripType) {
  const pricing = getPricingTable(vehicleType);
  let totalPrice = 0;
  
  // Tính giá theo khoảng cách
  for (let range of pricing) {
    if (distance >= range.distance_from && 
        (range.distance_to === null || distance <= range.distance_to)) {
      totalPrice = distance * range.price_per_km;
      break;
    }
  }
  
  // Giảm giá cho khứ hồi (70% lượt về)
  if (tripType === 'roundtrip') {
    totalPrice = totalPrice + (totalPrice * 0.3);
  }
  
  return totalPrice;
}
```

### Booking Status Flow
```
pending → confirmed → in_progress → completed
       ↘ cancelled
```

### Auto-assign Driver
```javascript
async function assignDriver(booking) {
  const availableDrivers = await Driver.findAll({
    where: {
      vehicle_type: booking.vehicle_type,
      status: 'active'
    },
    order: [['rating', 'DESC'], ['total_trips', 'ASC']]
  });
  
  if (availableDrivers.length > 0) {
    const driver = availableDrivers[0];
    await booking.update({
      driver_id: driver.id,
      driver_name: driver.name,
      license_plate: driver.license_plate
    });
    
    // Gửi notification cho driver
    await sendDriverNotification(driver.id, booking.id);
  }
}
```

---

## 6. Notifications & Communications

### Email Templates
- **Booking Confirmation**: Xác nhận đặt xe
- **Booking Update**: Cập nhật trạng thái
- **Booking Cancellation**: Hủy đặt xe
- **Password Reset**: Đặt lại mật khẩu

### SMS Templates
- Xác nhận đặt xe với mã booking
- Thông tin tài xế và biển số xe
- Nhắc nhở trước giờ đón

### Push Notifications (Real-time)
```javascript
// Socket.io events
io.emit('booking_created', bookingData);
io.emit('booking_updated', bookingData);
io.emit('driver_assigned', { booking_id, driver_info });
```

---

## 7. File Upload & Storage

### Image Upload
- **Hero images**: 1920x1080 (JPG/PNG)
- **Service icons**: 512x512 (PNG với background transparent)
- **News images**: 800x600 (JPG/PNG)
- **User avatars**: 200x200 (JPG/PNG)

### File Validation
```javascript
const allowedTypes = {
  image: ['image/jpeg', 'image/png', 'image/webp'],
  document: ['application/pdf', 'application/msword'],
  video: ['video/mp4', 'video/mpeg']
};

const maxSizes = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  video: 50 * 1024 * 1024 // 50MB
};
```

---

## 8. Caching Strategy

### Redis Cache
- **Settings**: Cache 1 giờ
- **Pricing**: Cache 30 phút
- **News list**: Cache 15 phút
- **Dashboard stats**: Cache 5 phút

### Cache Keys
```
settings:hero
settings:services
settings:pricing
pricing:all
news:published
dashboard:stats:daily
user:profile:{user_id}
```

---

## 9. Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": {
      "customer_phone": "Số điện thoại không đúng định dạng"
    }
  }
}
```

### Error Codes
- `VALIDATION_ERROR`: Lỗi validate dữ liệu
- `UNAUTHORIZED`: Chưa đăng nhập
- `FORBIDDEN`: Không có quyền truy cập
- `NOT_FOUND`: Không tìm thấy dữ liệu
- `INTERNAL_ERROR`: Lỗi server

---

## 10. Logging & Monitoring

### Log Categories
- **Access logs**: API requests/responses
- **Error logs**: Errors, exceptions
- **Business logs**: Booking created, status changed
- **Security logs**: Login attempts, unauthorized access

### Log Format
```json
{
  "timestamp": "2024-12-15T10:30:00Z",
  "level": "info",
  "category": "business",
  "user_id": 1,
  "action": "booking_created",
  "resource": "BK001",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "details": {...}
}
```

---

## 11. Security Considerations

### Input Validation
- Sanitize tất cả input
- Rate limiting cho API endpoints
- CORS configuration
- SQL injection prevention

### Data Privacy
- Hash passwords với bcrypt
- Mã hóa sensitive data
- GDPR compliance cho EU users
- Data retention policies

### API Security
```javascript
// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100 // tối đa 100 requests
}));

// Input validation
app.use('/api/', express.json({ limit: '10mb' }));
app.use(helmet()); // Security headers
```

---

## 12. Testing Strategy

### Unit Tests
- Models và business logic
- Utility functions
- Price calculation

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### Test Data
```javascript
const testBooking = {
  customer_name: "Test User",
  customer_phone: "0901234567",
  service_type: "taxi-gia-re",
  vehicle_type: "4seats",
  pickup_location: "Test Address",
  destination: "Test Destination",
  pickup_date: "2024-12-20",
  pickup_time: "10:00"
};
```

---

## 13. Deployment & DevOps

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taxi_db
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# SMS
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
```

### Docker Configuration
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 14. Migration Scripts

### Initial Data
```sql
-- Insert default admin user
INSERT INTO users (name, email, phone, password_hash, role) VALUES 
('Admin User', 'admin@vandamtour.com', '0901234567', '$2b$10$...', 'admin');

-- Insert default pricing
INSERT INTO pricing (vehicle_type, distance_from, distance_to, price_per_km) VALUES
('4seats', 0, 10, 14000),
('4seats', 10, 100, 10000),
('4seats', 100, NULL, 9000),
('7seats', 0, 10, 18000),
('7seats', 10, 100, 15000),
('7seats', 100, NULL, 11000);

-- Insert default settings
INSERT INTO settings (section, key_name, value) VALUES
('hero', 'title', 'TAXI VÂN ĐĂM TOUR'),
('hero', 'subtitle', 'Dịch vụ taxi uy tín, an toàn và tiện lợi'),
('contact', 'phone', '0901234567'),
('contact', 'email', 'info@vandamtour.com');
```

---

## 15. Performance Optimization

### Database Indexing
```sql
-- Indexing for fast lookups
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(pickup_date);
CREATE INDEX idx_bookings_phone ON bookings(customer_phone);
CREATE INDEX idx_news_published ON news(status, publish_date);
CREATE INDEX idx_users_email ON users(email);
```

### Query Optimization
- Use pagination cho large datasets
- Implement database connection pooling
- Use read replicas cho heavy read operations
- Optimize N+1 queries

---

## Kết luận

Tài liệu này cung cấp roadmap đầy đủ để phát triển backend cho hệ thống Taxi Vân Đăm Tour. 

**Prioritize Implementation:**
1. Database setup và basic models
2. Authentication system
3. Booking APIs (core business)
4. Admin dashboard APIs
5. File upload và media management
6. Real-time notifications
7. Advanced features (analytics, reporting)

**Estimated Timeline:**
- Phase 1 (Core): 4-6 tuần
- Phase 2 (Admin): 2-3 tuần  
- Phase 3 (Advanced): 2-3 tuần

Hãy bắt đầu với Phase 1 và triển khai từng bước một cách có hệ thống.