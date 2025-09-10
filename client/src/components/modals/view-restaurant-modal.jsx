import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, MapPin, Phone, Mail, Calendar, DollarSign, Percent, Star } from "lucide-react";
export function ViewRestaurantModal({ open, onOpenChange, restaurant }) {
  if (!restaurant) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Restaurant Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <img 
              src={restaurant.imageUrl || "/placeholder-restaurant.jpg"} 
              alt={restaurant.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" data-testid="view-restaurant-name">
                  {restaurant.name}
                </h2>
                <span className={getStatusBadge(restaurant.status)} data-testid="view-restaurant-status">
                  {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                </span>
              </div>
              <p className="text-lg text-muted-foreground mt-1">{restaurant.cuisine}</p>
              <p className="text-sm text-muted-foreground mt-1">Owner: {restaurant.ownerName}</p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium" data-testid="view-restaurant-phone">{restaurant.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium" data-testid="view-restaurant-email">{restaurant.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium" data-testid="view-restaurant-address">
                      {restaurant.address}<br />
                      {restaurant.city}, {restaurant.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Business Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
                <p className="text-2xl font-bold text-green-600" data-testid="view-restaurant-revenue">
                  ${Number(restaurant.revenue).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Percent className="w-5 h-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Commission Rate</p>
                </div>
                <p className="text-2xl font-bold text-primary" data-testid="view-restaurant-commission">
                  {restaurant.commissionRate}%
                </p>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Joined Date</p>
                </div>
                <p className="text-2xl font-bold" data-testid="view-restaurant-joined">
                  {restaurant.joinedDate?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                    <p className="text-xl font-bold">4.8/5</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500 fill-current" />
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-xl font-bold">1,247</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">+12%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-testid="close-view-modal"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}