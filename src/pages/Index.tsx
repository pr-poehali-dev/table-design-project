import React from "react";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Определяем тип данных для сотрудников
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  status: "active" | "vacation" | "sick" | "fired";
  age: number;
  joinDate: string;
}

// Создаем тестовые данные
const employeesData: Employee[] = [
  {
    id: 1,
    name: "Анна Иванова",
    position: "Frontend Developer",
    department: "Разработка",
    status: "active",
    age: 28,
    joinDate: "2022-05-12",
  },
  {
    id: 2,
    name: "Петр Сидоров",
    position: "Backend Developer",
    department: "Разработка",
    status: "vacation",
    age: 32,
    joinDate: "2021-03-15",
  },
  {
    id: 3,
    name: "Мария Петрова",
    position: "UI/UX Designer",
    department: "Дизайн",
    status: "active",
    age: 26,
    joinDate: "2023-01-20",
  },
  {
    id: 4,
    name: "Иван Смирнов",
    position: "Project Manager",
    department: "Менеджмент",
    status: "active",
    age: 35,
    joinDate: "2020-11-05",
  },
  {
    id: 5,
    name: "Екатерина Козлова",
    position: "QA Engineer",
    department: "Тестирование",
    status: "sick",
    age: 29,
    joinDate: "2022-07-18",
  },
  {
    id: 6,
    name: "Алексей Николаев",
    position: "DevOps Engineer",
    department: "Инфраструктура",
    status: "active",
    age: 31,
    joinDate: "2021-09-30",
  },
  {
    id: 7,
    name: "Ольга Соколова",
    position: "Content Manager",
    department: "Маркетинг",
    status: "fired",
    age: 27,
    joinDate: "2022-02-14",
  },
  {
    id: 8,
    name: "Дмитрий Кузнецов",
    position: "Sales Manager",
    department: "Продажи",
    status: "active",
    age: 33,
    joinDate: "2021-05-22",
  },
  {
    id: 9,
    name: "Наталья Морозова",
    position: "HR Manager",
    department: "HR",
    status: "vacation",
    age: 30,
    joinDate: "2022-08-10",
  },
  {
    id: 10,
    name: "Сергей Волков",
    position: "System Administrator",
    department: "Инфраструктура",
    status: "active",
    age: 34,
    joinDate: "2020-12-15",
  },
  {
    id: 11,
    name: "Юлия Королева",
    position: "Data Analyst",
    department: "Аналитика",
    status: "active",
    age: 29,
    joinDate: "2023-03-05",
  },
  {
    id: 12,
    name: "Артем Лебедев",
    position: "Full Stack Developer",
    department: "Разработка",
    status: "active",
    age: 27,
    joinDate: "2022-06-20",
  },
];

// Функция для отображения статуса
const getStatusBadge = (status: Employee["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 hover:bg-green-600">Активен</Badge>;
    case "vacation":
      return (
        <Badge
          variant="secondary"
          className="bg-primary-400 text-white hover:bg-primary-500"
        >
          Отпуск
        </Badge>
      );
    case "sick":
      return (
        <Badge
          variant="outline"
          className="text-yellow-700 border-yellow-500 hover:bg-yellow-50"
        >
          Болеет
        </Badge>
      );
    case "fired":
      return <Badge variant="destructive">Уволен</Badge>;
    default:
      return null;
  }
};

// Функция для форматирования даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const Index = () => {
  // Определяем колонки для таблицы
  const columns = [
    {
      header: "ID",
      accessorKey: "id" as keyof Employee,
      sortable: true,
    },
    {
      header: "Имя",
      accessorKey: "name" as keyof Employee,
      sortable: true,
    },
    {
      header: "Должность",
      accessorKey: "position" as keyof Employee,
      sortable: true,
    },
    {
      header: "Отдел",
      accessorKey: "department" as keyof Employee,
      sortable: true,
    },
    {
      header: "Возраст",
      accessorKey: "age" as keyof Employee,
      sortable: true,
    },
    {
      header: "Дата найма",
      accessorKey: "joinDate" as keyof Employee,
      cell: (employee: Employee) => formatDate(employee.joinDate),
      sortable: true,
    },
    {
      header: "Статус",
      accessorKey: "status" as keyof Employee,
      cell: (employee: Employee) => getStatusBadge(employee.status),
      sortable: true,
    },
    {
      header: "Действия",
      accessorKey: "id" as keyof Employee,
      sortable: false,
      cell: (employee: Employee) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-8 px-2">
            <Icon name="Edit" className="h-4 w-4 mr-1" />
            Изменить
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:border-red-700"
          >
            <Icon name="Trash2" className="h-4 w-4 mr-1" />
            Удалить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#337ab7] mb-2">
            Управление сотрудниками
          </h1>
          <p className="text-[#337ab7]/70">
            Просмотр и управление данными о сотрудниках компании
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary-600 text-white shadow-sm">
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить сотрудника
            </Button>
            <Button
              variant="outline"
              className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-800"
            >
              <Icon name="Download" className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Всего: {employeesData.length} сотрудников
            </span>
          </div>
        </div>

        <DataTable
          data={employeesData}
          columns={columns}
          title="Список сотрудников"
          pageSize={6}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default Index;
