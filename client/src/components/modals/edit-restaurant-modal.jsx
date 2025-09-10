import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { insertRestaurantSchema } from "@shared/schema.js";
import { useApp } from "@/context/app-context.jsx";
import { useToast } from "@/hooks/use-toast";


export function EditRestaurantModal({ open, onOpenChange, restaurant }) {
  const { updateRestaurant } = useApp();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertRestaurantSchema),
    defaultValues: {
      name: "",
      cuisine: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      status: "active",
      commissionRate: 5.0,
      revenue: "0.0",
      imageUrl: "",
    },
  });

  // Update form values when restaurant changes
  useEffect(() => {
    if (restaurant && open) {
      form.reset({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        ownerName: restaurant.ownerName,
        phone: restaurant.phone,
        email: restaurant.email,
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        status: restaurant.status,
        commissionRate: parseFloat(restaurant.commissionRate || "5.0"),
        revenue: restaurant.revenue || "0.0",
        imageUrl: restaurant.imageUrl || "",
      });
    }
  }, [restaurant, open, form]);

  const onSubmit = async (data) => {
    if (!restaurant) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      updateRestaurant(restaurant.id, data);
      toast({
        title: "Success",
        description: "Restaurant updated successfully!",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cuisineOptions = [
    "Italian",
    "Mexican", 
    "Japanese",
    "French",
    "American",
    "Indian",
    "Chinese",
    "Other"
  ];

  if (!restaurant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Restaurant</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="edit-name">Restaurant Name *</Label>
              <Input
                id="edit-name"
                data-testid="edit-input-restaurant-name"
                {...form.register("name")}
                placeholder="Enter restaurant name"
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-cuisine">Cuisine Type *</Label>
              <Select 
                value={form.watch("cuisine")} 
                onValueChange={(value) => form.setValue("cuisine", value)}
              >
                <SelectTrigger className="mt-1" data-testid="edit-select-cuisine">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.cuisine && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.cuisine.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="edit-ownerName">Owner Name *</Label>
              <Input
                id="edit-ownerName"
                data-testid="edit-input-owner-name"
                {...form.register("ownerName")}
                placeholder="Enter owner name"
                className="mt-1"
              />
              {form.formState.errors.ownerName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.ownerName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone Number *</Label>
              <Input
                id="edit-phone"
                data-testid="edit-input-phone"
                {...form.register("phone")}
                placeholder="Enter phone number"
                className="mt-1"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="edit-email">Email Address *</Label>
            <Input
              id="edit-email"
              type="email"
              data-testid="edit-input-email"
              {...form.register("email")}
              placeholder="Enter email address"
              className="mt-1"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="edit-address">Address *</Label>
            <Textarea
              id="edit-address"
              data-testid="edit-input-address"
              {...form.register("address")}
              placeholder="Enter complete address"
              className="mt-1"
              rows={3}
            />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="edit-city">City *</Label>
              <Input
                id="edit-city"
                data-testid="edit-input-city"
                {...form.register("city")}
                placeholder="Enter city"
                className="mt-1"
              />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-state">State *</Label>
              <Input
                id="edit-state"
                data-testid="edit-input-state"
                {...form.register("state")}
                placeholder="Enter state"
                className="mt-1"
              />
              {form.formState.errors.state && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="edit-commissionRate">Commission Rate (%)</Label>
              <Input
                id="edit-commissionRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                data-testid="edit-input-commission-rate"
                {...form.register("commissionRate", { valueAsNumber: true })}
                placeholder="Enter commission rate"
                className="mt-1"
              />
              {form.formState.errors.commissionRate && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.commissionRate.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                data-testid="edit-input-image-url"
                {...form.register("imageUrl")}
                placeholder="Enter image URL"
                className="mt-1"
              />
              {form.formState.errors.imageUrl && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.imageUrl.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="edit-status">Status</Label>
            <Select 
              value={form.watch("status")} 
              onValueChange={(value) => form.setValue("status", value)}
            >
              <SelectTrigger className="mt-1" data-testid="edit-select-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.status && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.status.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-testid="edit-button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              data-testid="edit-button-submit"
            >
              {isSubmitting ? "Updating..." : "Update Restaurant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}