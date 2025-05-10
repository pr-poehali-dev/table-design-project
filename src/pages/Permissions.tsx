
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Определение типа для данных разрешений
interface Permission {
  id: number;
  date: string;
  sourceUser: string;
  sourceEmail: string;
  targetUser: string;
  targetEmail: string;
  requestNumber: string;
}

const PermissionsPage = () => {
  // Демо-данные
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 1,
      date: "-",
      sourceUser: "fesb5 fesb5",
      sourceEmail: "fesb5@index.ru",
      targetUser: "fesb5 fesb5",
      targetEmail: "fesb5@index.ru",
      requestNumber: "-"
    },
    {
      id: 2,
      date: "-",
      sourceUser: "fesb4 fesb4",
      sourceEmail: "fesb4@index.ru",
      targetUser: "fesb4 fesb4",
      targetEmail: "fesb4@index.ru",
      requestNumber: "-"
    },
    {
      id: 3,
      date: "-",
      sourceUser: "fesb3 fesb3",
      sourceEmail: "fesb3@index.ru",
      targetUser: "fesb3 fesb3",
      targetEmail: "fesb3@index.ru",
      requestNumber: "-"
    },
    {
      id: 4,
      date: "2025-04-27 04:37",
      sourceUser: "fesb1 fesb1",
      sourceEmail: "fesb1@index.ru",
      targetUser: "fesb1 fesb1",
      targetEmail: "fesb1@index.ru",
      requestNumber: "-"
    },
  ]);

  // Фильтрация и поиск
  const [filters, setFilters] = useState({
    date: "",
    sourceUser: "",
    targetUser: "",
    requestNumber: ""
  });

  // Модальное окно для добавления
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPermission, setNewPermission] = useState<Omit<Permission, "id">>({
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
    sourceUser: "",
    sourceEmail: "",
    targetUser: "",
    targetEmail: "",
    requestNumber: ""
  });

  // Обработчик изменения фильтров
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик изменения нового разрешения
  const handleNewPermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPermission(prev => ({ ...prev, [name]: value }));
  };

  // Добавление нового разрешения
  const handleAddPermission = () => {
    const maxId = Math.max(...permissions.map(p => p.id), 0);
    setPermissions([
      ...permissions,
      { id: maxId + 1, ...newPermission }
    ]);
    setIsAddModalOpen(false);
    // Сброс формы
    setNewPermission({
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      sourceUser: "",
      sourceEmail: "",
      targetUser: "",
      targetEmail: "",
      requestNumber: ""
    });
  };

  // Удаление разрешения
  const handleDeletePermission = (id: number) => {
    setPermissions(permissions.filter(p => p.id !== id));
  };

  // Экспорт в XML
  const handleExportXML = () => {
    // Реализация экспорта в XML
    alert("Функция экспорта в XML будет реализована в будущем");
  };

  // Фильтрация данных
  const filteredPermissions = permissions.filter(permission => {
    return (
      permission.date.toLowerCase().includes(filters.date.toLowerCase()) &&
      (permission.sourceUser.toLowerCase().includes(filters.sourceUser.toLowerCase()) ||
       permission.sourceEmail.toLowerCase().includes(filters.sourceUser.toLowerCase())) &&
      (permission.targetUser.toLowerCase().includes(filters.targetUser.toLowerCase()) ||
       permission.targetEmail.toLowerCase().includes(filters.targetUser.toLowerCase())) &&
      permission.requestNumber.toLowerCase().includes(filters.requestNumber.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-[#337ab7] text-white py-6">
            <CardTitle className="text-center text-2xl font-medium">
              Таблица разрешений передачи из ОКС в ЗКС
            </CardTitle>
          </CardHeader>
          
          <div className="p-4 bg-white border-b flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleExportXML}
              className="border-[#337ab7] text-[#337ab7] hover:bg-[#337ab7]/10"
            >
              <Icon name="FileJson" className="mr-2 h-4 w-4" />
              Экспорт XML
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="border-[#337ab7] text-[#337ab7] hover:bg-[#337ab7]/10"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Добавить
              </Button>
              
              <Button className="bg-[#337ab7] hover:bg-[#337ab7]/90">
                <Icon name="Check" className="mr-2 h-4 w-4" />
                Применить
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-white text-[#337ab7]">
            <div className="text-sm mb-2">Кол-во: {filteredPermissions.length}</div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-black w-16 text-center">№</TableHead>
                    <TableHead className="font-semibold text-black">
                      <div className="mb-2">Дата</div>
                      <Input 
                        placeholder="Фильтр" 
                        className="h-8 text-xs border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      <div className="mb-2">из ОКС пользователь:</div>
                      <Input 
                        placeholder="Фильтр" 
                        className="h-8 text-xs border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                        name="sourceUser"
                        value={filters.sourceUser}
                        onChange={handleFilterChange}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      <div className="mb-2">в ЗКС пользователь:</div>
                      <Input 
                        placeholder="Фильтр" 
                        className="h-8 text-xs border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                        name="targetUser"
                        value={filters.targetUser}
                        onChange={handleFilterChange}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      <div className="mb-2">Номер заявки</div>
                      <Input 
                        placeholder="Фильтр" 
                        className="h-8 text-xs border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                        name="requestNumber"
                        value={filters.requestNumber}
                        onChange={handleFilterChange}
                      />
                    </TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPermissions.map((permission) => (
                    <TableRow 
                      key={permission.id}
                      className="hover:bg-[#337ab7]/5 text-[#337ab7] border-b border-gray-100"
                    >
                      <TableCell className="font-medium text-center">{permission.id}</TableCell>
                      <TableCell>{permission.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div>
                            <span>{permission.sourceUser}</span>
                            <span className="text-gray-500 italic ml-1">({permission.sourceEmail})</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 h-6 w-6 text-gray-400 hover:text-[#337ab7]"
                          >
                            <Icon name="Edit" className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div>
                            <span>{permission.targetUser}</span>
                            <span className="text-gray-500 italic ml-1">({permission.targetEmail})</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 h-6 w-6 text-gray-400 hover:text-[#337ab7]"
                          >
                            <Icon name="Edit" className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span>{permission.requestNumber}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 h-6 w-6 text-gray-400 hover:text-[#337ab7]"
                          >
                            <Icon name="Edit" className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeletePermission(permission.id)}
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPermissions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Нет данных для отображения
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>

      {/* Модальное окно для добавления нового разрешения */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#337ab7]">
              Добавить новое разрешение
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Дата:</label>
              <Input
                name="date"
                className="col-span-3 border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                value={newPermission.date}
                onChange={handleNewPermissionChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">ОКС пользователь:</label>
              <Input
                name="sourceUser"
                className="col-span-3 border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                value={newPermission.sourceUser}
                onChange={handleNewPermissionChange}
                placeholder="Имя пользователя"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">ОКС email:</label>
              <Input
                name="sourceEmail"
                className="col-span-3 border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                value={newPermission.sourceEmail}
                onChange={handleNewPermissionChange}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">ЗКС пользователь:</label>
              <Input
                name="targetUser"
                className="col-span-3 border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                value={newPermission.targetUser}
                onChange={handleNewPermissionChange}
                placeholder="Имя пользователя"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">ЗКС email:</label>
              <Input
                name="targetEmail"
                className="col-span-3 border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                value={newPermission.targetEmail}
                onChange={handleNewPermissionChange}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Номер заявки:</label>
              <Input
                name="requestNumber"
                className="col-span-3 border-[#337ab7]/30 focus-visible:ring-[#337ab7]"
                value={newPermission.requestNumber}
                onChange={handleNewPermissionChange}
                placeholder="Номер заявки"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
              className="border-gray-300"
            >
              Отмена
            </Button>
            <Button 
              onClick={handleAddPermission}
              className="bg-[#337ab7] hover:bg-[#337ab7]/90"
            >
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsPage;
