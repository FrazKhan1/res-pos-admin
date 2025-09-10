import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/app-context.jsx";
import { useToast } from "@/hooks/use-toast";
import { ENV } from "../../lib/config";
import toast from "react-hot-toast";

export function AddRestaurantModal({ open, onOpenChange }) {
  const { addRestaurant } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    ownerName: "",
    address: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Restaurant name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    ownerName: Yup.string().required("Owner name is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      const res = await fetch(`${ENV.baseUrl}/api/restaurant/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      console.log("Add restaurant response:", data);
      if (data.success) {
        toast.success(data.message || "Restaurant added successfully");
        resetForm();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add restaurant");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Restaurant</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Restaurant Name *</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Enter restaurant name"
                  className="mt-1"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Owner Name */}
              <div>
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Field
                  as={Input}
                  id="ownerName"
                  name="ownerName"
                  placeholder="Enter owner name"
                  className="mt-1"
                />
                <ErrorMessage
                  name="ownerName"
                  component="p"
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  className="mt-1"
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  className="mt-1"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address *</Label>
                <Field
                  as={Textarea}
                  id="address"
                  name="address"
                  placeholder="Enter complete address"
                  className="mt-1"
                  rows={3}
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-sm text-destructive mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Restaurant"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
