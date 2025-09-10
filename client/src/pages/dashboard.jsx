import { TrendingUp, Store, CheckCircle, DollarSign, Ban } from "lucide-react";
import { Header } from "@/components/layout/header.jsx";
import { RevenueChart } from "@/components/charts/revenue-chart.jsx";
import { DistributionChart } from "@/components/charts/distribution-chart.jsx";
import { AddRestaurantModal } from "@/components/modals/add-restaurant-modal.jsx";
import { ViewRestaurantModal } from "@/components/modals/view-restaurant-modal.jsx";
import { EditRestaurantModal } from "@/components/modals/edit-restaurant-modal.jsx";
import { ConfirmationModal } from "@/components/modals/confirmation-modal.tsx";
import { useState } from "react";
import { useApp } from "@/context/app-context.jsx";
import { mockStats } from "@/lib/mock-data.js";
import { Eye, Edit, Trash, Unlock, Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  const { 
    state, 
    deleteRestaurant, 
    blockRestaurant, 
    unblockRestaurant,
    setSearchTerm,
    setStatusFilter,
    setCurrentPage,
    getFilteredRestaurants,
    getTotalPages
  } = useApp();
  
  const { toast } = useToast();

  const handleDeleteRestaurant = (id, name) => {
    setConfirmationData({
      title: "Delete Restaurant",
      message: `Are you sure you want to delete "${name}"? This action cannot be undone and will remove all associated data.`,
      action: () => {
        deleteRestaurant(id);
        toast({
          title: "Success",
          description: "Restaurant deleted successfully",
        });
      },
    });
    setShowConfirmation(true);
  };

  const handleBlockRestaurant = (id, name) => {
    setConfirmationData({
      title: "Block Restaurant",
      message: `Are you sure you want to block "${name}"? They will not be able to process orders.`,
      action: () => {
        blockRestaurant(id);
        toast({
          title: "Success",
          description: "Restaurant blocked successfully",
        });
      },
    });
    setShowConfirmation(true);
  };

  const handleUnblockRestaurant = (id, name) => {
    setConfirmationData({
      title: "Unblock Restaurant",
      message: `Are you sure you want to unblock "${name}"? They will be able to process orders again.`,
      action: () => {
        unblockRestaurant(id);
        toast({
          title: "Success",
          description: "Restaurant unblocked successfully",
        });
      },
    });
    setShowConfirmation(true);
  };

  const handleViewRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowViewModal(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowEditModal(true);
  };

  const filteredRestaurants = getFilteredRestaurants();
  const totalPages = getTotalPages();

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "blocked":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "inactive":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const statsCards = [
    {
      title: "Total Restaurants",
      value: mockStats.totalRestaurants.toString(),
      icon: Store,
      growth: `+${mockStats.totalGrowth}%`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Restaurants", 
      value: mockStats.activeRestaurants.toString(),
      icon: CheckCircle,
      growth: `+${mockStats.activeGrowth}%`,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: `$${mockStats.totalRevenue}`,
      icon: DollarSign,
      growth: `+${mockStats.revenueGrowth}%`,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Blocked Restaurants",
      value: mockStats.blockedRestaurants.toString(),
      icon: Ban,
      growth: "-2",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Dashboard Overview"
        subtitle="Monitor your restaurant network performance"
        showAddButton
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Restaurant"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold" data-testid={`stat-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`${stat.color} text-xl w-6 h-6`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600">{stat.growth}</span>
                  <span className="text-muted-foreground ml-2">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <DistributionChart />
        </div>

        {/* Recent Restaurants Table */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Restaurants</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search restaurants..."
                    className="pl-10 w-64"
                    data-testid="search-restaurants"
                    value={state.searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={state.statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40" data-testid="filter-status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-sm text-muted-foreground">Restaurant</th>
                  <th className="text-left py-3 px-6 font-medium text-sm text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-sm text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-6 font-medium text-sm text-muted-foreground">Joined</th>
                  <th className="text-right py-3 px-6 font-medium text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-muted/30 transition-colors" data-testid={`restaurant-row-${restaurant.id}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img 
                          src={restaurant.imageUrl || "/placeholder-restaurant.jpg"} 
                          alt={restaurant.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium" data-testid={`restaurant-name-${restaurant.id}`}>{restaurant.name}</p>
                          <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">
                      {restaurant.city}, {restaurant.state}
                    </td>
                    <td className="py-4 px-6">
                      <span className={getStatusBadge(restaurant.status)} data-testid={`restaurant-status-${restaurant.id}`}>
                        {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">
                      ${Number(restaurant.revenue).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">
                      {restaurant.joinedDate?.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRestaurant(restaurant)}
                          data-testid={`view-restaurant-${restaurant.id}`}
                          className="p-2 h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRestaurant(restaurant)}
                          data-testid={`edit-restaurant-${restaurant.id}`}
                          className="p-2 h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {restaurant.status === "blocked" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnblockRestaurant(restaurant.id, restaurant.name)}
                            data-testid={`unblock-restaurant-${restaurant.id}`}
                            className="p-2 h-8 w-8 text-green-600 hover:text-green-700"
                          >
                            <Unlock className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBlockRestaurant(restaurant.id, restaurant.name)}
                            data-testid={`block-restaurant-${restaurant.id}`}
                            className="p-2 h-8 w-8 text-yellow-600 hover:text-yellow-700"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRestaurant(restaurant.id, restaurant.name)}
                          data-testid={`delete-restaurant-${restaurant.id}`}
                          className="p-2 h-8 w-8 text-destructive hover:text-destructive/90"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((state.currentPage - 1) * state.itemsPerPage) + 1}-{Math.min(state.currentPage * state.itemsPerPage, state.restaurants.length)} of {state.restaurants.length} restaurants
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, state.currentPage - 1))}
                  disabled={state.currentPage === 1}
                  data-testid="pagination-previous"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === state.currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    data-testid={`pagination-page-${page}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, state.currentPage + 1))}
                  disabled={state.currentPage === totalPages}
                  data-testid="pagination-next"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddRestaurantModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />

      <ViewRestaurantModal
        open={showViewModal}
        onOpenChange={setShowViewModal}
        restaurant={selectedRestaurant}
      />

      <EditRestaurantModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        restaurant={selectedRestaurant}
      />

      {confirmationData && (
        <ConfirmationModal
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          title={confirmationData.title}
          message={confirmationData.message}
          onConfirm={confirmationData.action}
          confirmText="Confirm"
        />
      )}
    </div>
  );
}
