import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
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


export function AddRestaurantModal({ open, onOpenChange }) {
  const { addRestaurant } = useApp();
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      addRestaurant(data);
      toast({
        title: "Success",
        description: "Restaurant added successfully!",
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add restaurant. Please try again.",
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Restaurant</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Restaurant Name *</Label>
              <Input
                id="name"
                data-testid="input-restaurant-name"
                {...form.register("name")}
                placeholder="Enter restaurant name"
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cuisine">Cuisine Type *</Label>
              <Select onValueChange={(value) => form.setValue("cuisine", value)}>
                <SelectTrigger className="mt-1" data-testid="select-cuisine">
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
              <Label htmlFor="ownerName">Owner Name *</Label>
              <Input
                id="ownerName"
                data-testid="input-owner-name"
                {...form.register("ownerName")}
                placeholder="Enter owner name"
                className="mt-1"
              />
              {form.formState.errors.ownerName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.ownerName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                data-testid="input-phone"
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
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              data-testid="input-email"
              {...form.register("email")}
              placeholder="Enter email address"
              className="mt-1"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              data-testid="input-address"
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
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                data-testid="input-city"
                {...form.register("city")}
                placeholder="Enter city"
                className="mt-1"
              />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                data-testid="input-state"
                {...form.register("state")}
                placeholder="Enter state"
                className="mt-1"
              />
              {form.formState.errors.state && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="commissionRate">Commission Rate (%)</Label>
            <Input
              id="commissionRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              data-testid="input-commission-rate"
              {...form.register("commissionRate", { valueAsNumber: true })}
              placeholder="Enter commission rate"
              className="mt-1"
            />
            {form.formState.errors.commissionRate && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.commissionRate.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="activeStatus"
              data-testid="checkbox-active-status"
              checked={form.watch("status") === "active"}
              onCheckedChange={(checked) => form.setValue("status", checked ? "active" : "inactive")}
            />
            <Label htmlFor="activeStatus">Activate restaurant immediately</Label>
          </div>

          <div className="flex gap-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              data-testid="button-submit"
            >
              {isSubmitting ? "Adding..." : "Add Restaurant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
