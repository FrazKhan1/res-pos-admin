import { useState } from "react";
import { Header } from "@/components/layout/header.jsx";
import { AddRestaurantModal } from "@/components/modals/add-restaurant-modal.jsx";
import { ViewRestaurantModal } from "@/components/modals/view-restaurant-modal.jsx";
import { EditRestaurantModal } from "@/components/modals/edit-restaurant-modal.jsx";
import { ConfirmationModal } from "@/components/modals/confirmation-modal.tsx";
import { useApp } from "@/context/app-context.jsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Search, Eye, Edit, Trash, Ban, Unlock, Phone, Mail, MapPin, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Restaurants() {
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

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "default";
      case "blocked":
        return "destructive";
      case "inactive":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Restaurant Management"
        subtitle="Manage all restaurants in your network"
        showAddButton
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Restaurant"
      />

      <div className="p-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search restaurants by name, location..."
              className="pl-10"
              data-testid="search-restaurants"
              value={state.searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={state.statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48" data-testid="filter-status">
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

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow" data-testid={`restaurant-card-${restaurant.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={restaurant.imageUrl || "/placeholder-restaurant.jpg"} 
                      alt={restaurant.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg" data-testid={`restaurant-name-${restaurant.id}`}>
                        {restaurant.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(restaurant.status)} data-testid={`restaurant-status-${restaurant.id}`}>
                    {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {restaurant.address}, {restaurant.city}, {restaurant.state}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {restaurant.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {restaurant.email}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-semibold">${Number(restaurant.revenue).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Commission</p>
                    <p className="font-semibold">{restaurant.commissionRate}%</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewRestaurant(restaurant)}
                    data-testid={`view-restaurant-${restaurant.id}`}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditRestaurant(restaurant)}
                    data-testid={`edit-restaurant-${restaurant.id}`}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <div className="flex gap-1">
                    {restaurant.status === "blocked" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnblockRestaurant(restaurant.id, restaurant.name)}
                        data-testid={`unblock-restaurant-${restaurant.id}`}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Unlock className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBlockRestaurant(restaurant.id, restaurant.name)}
                        data-testid={`block-restaurant-${restaurant.id}`}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRestaurant(restaurant.id, restaurant.name)}
                      data-testid={`delete-restaurant-${restaurant.id}`}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-4">
              {state.searchTerm || state.statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first restaurant"
              }
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              Add Restaurant
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredRestaurants.length > 0 && totalPages > 1 && (
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
        )}
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
