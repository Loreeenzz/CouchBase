"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  UserCheck,
  Filter,
  X,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

// Define types for our data structure
type UserData = {
  id: number;
  name: string;
  email: string;
  section: string;
  status: string;
};

type SortConfig = {
  key: keyof UserData;
  direction: "ascending" | "descending";
};

// Mock data - 11 rows as requested
const mockData: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    section: "3A",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    section: "3B",
    status: "Active",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    section: "3C",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    section: "3D",
    status: "Active",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    section: "3E",
    status: "Active",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah@example.com",
    section: "3F",
    status: "Inactive",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david@example.com",
    section: "3A",
    status: "Active",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    section: "3B",
    status: "Active",
  },
  {
    id: 9,
    name: "James Anderson",
    email: "james@example.com",
    section: "3C",
    status: "Inactive",
  },
  {
    id: 10,
    name: "Lisa Thomas",
    email: "lisa@example.com",
    section: "3D",
    status: "Active",
  },
  {
    id: 11,
    name: "Daniel White",
    email: "daniel@example.com",
    section: "3E",
    status: "Active",
  },
];

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "ascending",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...mockData];

    // Apply tab filter
    if (activeTab === "active") {
      filtered = filtered.filter((item) => item.status === "Active");
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((item) => item.status === "Inactive");
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Apply section filter
    if (sectionFilter !== "all") {
      filtered = filtered.filter((item) => item.section === sectionFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === "id") {
        return sortConfig.direction === "ascending" ? a.id - b.id : b.id - a.id;
      }

      const aValue = String(a[sortConfig.key]).toLowerCase();
      const bValue = String(b[sortConfig.key]).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [
    mockData,
    searchTerm,
    statusFilter,
    sectionFilter,
    sortConfig,
    activeTab,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Handle sorting
  const requestSort = (key: keyof UserData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key: keyof UserData) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="ml-1 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 text-primary" />
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSectionFilter("all");
    setSortConfig({ key: "id", direction: "ascending" });
    setCurrentPage(1);
  };

  // Update page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sectionFilter, activeTab]);

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (statusFilter !== "all") count++;
    if (sectionFilter !== "all") count++;
    return count;
  };

  // Add this function before the return statement
  const handleEdit = (userId: string) => {
    router.push(`/students/edit-student?id=${userId}`);
  };

  const handleAdd = () => {
    router.push("/students/add-student");
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            User Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and monitor user accounts
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button
            className="rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
            onClick={handleAdd}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-0 shadow-soft dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
                <TabsTrigger
                  value="all"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  All Users
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="inactive"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Inactive
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div
                  className={`relative flex-1 min-w-[200px] md:min-w-[300px] transition-all duration-200 ${
                    isSearchFocused ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                      searchTerm || isSearchFocused
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    className="pl-9 pr-4 py-2 rounded-full border-slate-200 dark:border-slate-700 focus-visible:ring-primary/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </div>
                <Button
                  variant={
                    showFilters || getActiveFiltersCount() > 0
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="rounded-full relative"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {getActiveFiltersCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">
                      Status
                    </label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">
                      Section
                    </label>
                    <Select
                      value={sectionFilter}
                      onValueChange={setSectionFilter}
                    >
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Filter by section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sections</SelectItem>
                        <SelectItem value="3A">3A</SelectItem>
                        <SelectItem value="3B">3B</SelectItem>
                        <SelectItem value="3C">3C</SelectItem>
                        <SelectItem value="3D">3D</SelectItem>
                        <SelectItem value="3E">3E</SelectItem>
                        <SelectItem value="3F">3F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="default"
                      className="w-full sm:w-auto"
                      onClick={resetFilters}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reset filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-800/20">
                <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-slate-800">
                  <TableHead
                    className="cursor-pointer font-medium text-slate-700 dark:text-slate-300"
                    onClick={() => requestSort("id")}
                  >
                    <div className="flex items-center">
                      ID {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer font-medium text-slate-700 dark:text-slate-300"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Name {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer font-medium text-slate-700 dark:text-slate-300"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center">
                      Email {getSortIcon("email")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer font-medium text-slate-700 dark:text-slate-300"
                    onClick={() => requestSort("section")}
                  >
                    <div className="flex items-center">
                      Section {getSortIcon("section")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer font-medium text-slate-700 dark:text-slate-300"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right font-medium text-slate-700 dark:text-slate-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      <TableCell className="font-mono text-sm text-slate-500 dark:text-slate-400">
                        #{row.id.toString().padStart(3, "0")}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {row.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            px-2.5 py-0.5 rounded-full text-xs font-medium border-0
                            ${
                              row.section === "3A" || row.section === "3B"
                                ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                : row.section === "3C" || row.section === "3D"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                                : "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            }
                          `}
                        >
                          {row.section}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span
                            className={`
                              flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                              ${
                                row.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                  : "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                              }
                            `}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                row.status === "Active"
                                  ? "bg-emerald-500 animate-pulse"
                                  : "bg-rose-500"
                              }`}
                            ></span>
                            {row.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-40 rounded-xl"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer rounded-lg focus:bg-slate-50 dark:focus:bg-slate-800"
                                onClick={() => handleEdit(row.id.toString())}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-rose-600 dark:text-rose-400 cursor-pointer rounded-lg focus:bg-rose-50 dark:focus:bg-rose-900/20">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-full mb-4">
                          <Search className="h-10 w-10 opacity-30" />
                        </div>
                        <p className="text-lg font-medium mb-1">
                          No results found
                        </p>
                        <p className="text-sm mb-4">
                          Try adjusting your search or filters
                        </p>
                        <Button
                          variant="outline"
                          onClick={resetFilters}
                          className="rounded-full"
                        >
                          Reset all filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Rows per page:
              </span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px] h-8 rounded-lg">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-slate-500 dark:text-slate-400 ml-4">
                Showing {filteredData.length > 0 ? startIndex + 1 : 0}-
                {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
                {filteredData.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevrons-left"
                >
                  <path d="m11 17-5-5 5-5" />
                  <path d="m18 17-5-5 5-5" />
                </svg>
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>

              <div className="flex items-center mx-2">
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 rounded-full mx-0.5 ${
                        currentPage === pageNum ? "shadow-glow" : ""
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevrons-right"
                >
                  <path d="m6 17 5-5-5-5" />
                  <path d="m13 17 5-5-5-5" />
                </svg>
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
