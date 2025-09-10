import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Search, Edit, Trash, Plus, Tags } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Categories() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  const { state, addCategory, updateCategory, deleteCategory } = useApp();
  const { toast } = useToast();

  const form = useForm({
    // resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  const filteredCategories = state.categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      addCategory({
        ...data,
        description: data.description || null,
        isActive: data.isActive ?? true,
      });
      toast({
        title: "Success",
        description: "Category added successfully!",
      });
      form.reset();
      setShowAddModal(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCategory = (categoryId) => {
    const category = state.categories.find((c) => c.id === categoryId);
    if (category) {
      form.reset({
        name: category.name,
        description: category.description || "",
        isActive: category.isActive,
      });
      setEditingCategory(categoryId);
      setShowAddModal(true);
    }
  };

  const handleUpdateCategory = async (data) => {
    if (!editingCategory) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      updateCategory(editingCategory, data);
      toast({
        title: "Success",
        description: "Category updated successfully!",
      });
      form.reset();
      setShowAddModal(false);
      setEditingCategory(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = (id, name) => {
    setConfirmationData({
      title: "Delete Category",
      message: `Are you sure you want to delete the "${name}" category? This action cannot be undone.`,
      action: () => {
        deleteCategory(id);
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
      },
    });
    setShowConfirmation(true);
  };

  const handleToggleStatus = (id, currentStatus) => {
    updateCategory(id, { isActive: !currentStatus });
    toast({
      title: "Success",
      description: `Category ${
        !currentStatus ? "activated" : "deactivated"
      } successfully`,
    });
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    form.reset();
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Dish Categories"
        subtitle="Manage food categories for your restaurants"
        showAddButton
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Category"
      />

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            data-testid="search-categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-lg transition-shadow"
              data-testid={`category-card-${category.id}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Tags className="w-5 h-5 text-primary" />
                    <CardTitle
                      className="text-lg"
                      data-testid={`category-name-${category.id}`}
                    >
                      {category.name}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={category.isActive ? "default" : "secondary"}
                    data-testid={`category-status-${category.id}`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {category.description && (
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid={`category-description-${category.id}`}
                  >
                    {category.description}
                  </p>
                )}

                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Restaurants</p>
                    <p
                      className="font-semibold"
                      data-testid={`category-count-${category.id}`}
                    >
                      {category.restaurantCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-semibold text-xs">
                      {category.createdAt?.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={category.isActive ?? false}
                      onCheckedChange={() =>
                        handleToggleStatus(
                          category.id,
                          category.isActive ?? false
                        )
                      }
                      data-testid={`category-toggle-${category.id}`}
                    />
                    <span className="text-sm">
                      {category.isActive ?? false ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(category.id)}
                      data-testid={`edit-category-${category.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDeleteCategory(category.id, category.name)
                      }
                      data-testid={`delete-category-${category.id}`}
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
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Tags className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Get started by adding your first category"}
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      <Dialog open={showAddModal} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(
              editingCategory ? handleUpdateCategory : handleAddCategory
            )}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                data-testid="input-category-name"
                {...form.register("name")}
                placeholder="Enter category name"
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                data-testid="input-category-description"
                {...form.register("description")}
                placeholder="Enter category description"
                className="mt-1"
                rows={3}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                data-testid="switch-category-active"
                checked={form.watch("isActive") ?? false}
                onCheckedChange={(checked) =>
                  form.setValue("isActive", checked ?? false)
                }
              />
              <Label htmlFor="isActive">Active category</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCloseModal}
                data-testid="button-cancel-category"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                data-testid="button-submit-category"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      {confirmationData && (
        <ConfirmationModal
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          title={confirmationData.title}
          message={confirmationData.message}
          onConfirm={confirmationData.action}
          confirmText="Delete"
        />
      )}
    </div>
  );
}
