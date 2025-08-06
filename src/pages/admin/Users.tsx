import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Shield, User, Mail, Phone, Calendar, X } from "lucide-react";
import { toast } from "sonner";

const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn Admin",
    email: "admin@vandamtour.com",
    phone: "0901234567",
    role: "admin",
    status: "active",
    lastLogin: "2024-12-16 09:30",
    createdAt: "2024-01-15",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Trần Thị Manager",
    email: "manager@vandamtour.com", 
    phone: "0912345678",
    role: "manager",
    status: "active",
    lastLogin: "2024-12-15 16:45",
    createdAt: "2024-02-20",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Lê Văn Editor",
    email: "editor@vandamtour.com",
    phone: "0923456789",
    role: "editor",
    status: "active", 
    lastLogin: "2024-12-14 14:20",
    createdAt: "2024-03-10",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Phạm Thị User",
    email: "user@vandamtour.com",
    phone: "0934567890",
    role: "user",
    status: "inactive",
    lastLogin: "2024-12-01 10:15",
    createdAt: "2024-04-05",
    avatar: "/placeholder.svg"
  }
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active"
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const roleMap = {
      admin: { label: "Quản trị viên", variant: "destructive" as const },
      manager: { label: "Quản lý", variant: "default" as const },
      editor: { label: "Biên tập viên", variant: "secondary" as const },
      user: { label: "Người dùng", variant: "outline" as const }
    };
    return roleMap[role as keyof typeof roleMap] || roleMap.user;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? { label: "Hoạt động", variant: "default" as const }
      : { label: "Tạm khóa", variant: "secondary" as const };
  };

  const handleEdit = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      });
      setShowEditDialog(true);
    }
  };

  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "user",
      status: "active"
    });
    setShowCreateDialog(true);
  };

  const handleSubmitCreate = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
      lastLogin: "Chưa đăng nhập",
      createdAt: new Date().toISOString().split('T')[0],
      avatar: "/placeholder.svg"
    };

    setUsers([...users, newUser]);
    setShowCreateDialog(false);
    setFormData({ name: "", email: "", phone: "", role: "user", status: "active" });
    toast.success("Đã tạo tài khoản mới thành công!");
  };

  const handleSubmitEdit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, ...formData }
          : u
      ));
      setShowEditDialog(false);
      setSelectedUser(null);
      toast.success("Đã cập nhật tài khoản thành công!");
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success("Đã xóa tài khoản");
  };

  const handleToggleStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { 
        ...u, 
        status: u.status === 'active' ? 'inactive' : 'active' 
      } : u
    ));
    toast.success("Đã cập nhật trạng thái tài khoản");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Tài khoản</h1>
          <p className="text-muted-foreground">Quản lý tài khoản người dùng hệ thống</p>
        </div>
        <Button onClick={handleCreateUser} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tạo tài khoản mới
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Tìm kiếm theo tên, email hoặc SĐT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        
        <div className="flex gap-2">
          <Button 
            variant={filterRole === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterRole("all")}
          >
            Tất cả
          </Button>
          <Button 
            variant={filterRole === "admin" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterRole("admin")}
          >
            Admin
          </Button>
          <Button 
            variant={filterRole === "manager" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterRole("manager")}
          >
            Manager
          </Button>
          <Button 
            variant={filterRole === "editor" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterRole("editor")}
          >
            Editor
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const roleInfo = getRoleBadge(user.role);
          const statusInfo = getStatusBadge(user.status);
          
          return (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={roleInfo.variant}>
                          <Shield className="h-3 w-3 mr-1" />
                          {roleInfo.label}
                        </Badge>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(user.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Khóa' : 'Mở khóa'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Đăng nhập: {user.lastLogin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Tạo: {user.createdAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Không tìm thấy tài khoản nào</h3>
          <p className="text-muted-foreground">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </div>
      )}

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo tài khoản mới</DialogTitle>
            <DialogDescription>
              Thêm tài khoản người dùng mới vào hệ thống
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="createName">Họ và tên</Label>
              <Input
                id="createName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập họ và tên..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="createEmail">Email</Label>
              <Input
                id="createEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Nhập email..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="createPhone">Số điện thoại</Label>
              <Input
                id="createPhone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Nhập số điện thoại..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="createRole">Vai trò</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({...formData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="editor">Biên tập viên</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="createStatus">Trạng thái</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Tạm khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateDialog(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitCreate}>
                Tạo tài khoản
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin tài khoản {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Họ và tên</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập họ và tên..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Nhập email..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editPhone">Số điện thoại</Label>
              <Input
                id="editPhone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Nhập số điện thoại..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editRole">Vai trò</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({...formData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="editor">Biên tập viên</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editStatus">Trạng thái</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Tạm khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowEditDialog(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitEdit}>
                Cập nhật
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;