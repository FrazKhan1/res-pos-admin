import React, { createContext, useContext, useState } from "react";
import { mockRestaurants, mockCategories } from "@/lib/mock-data.js";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [state, setState] = useState({
    restaurants: mockRestaurants,
    categories: mockCategories,
    searchTerm: "",
    statusFilter: "all",
    currentPage: 1,
    itemsPerPage: 10,
  });

  const addRestaurant = (restaurant) => {
    const newRestaurant = {
      ...restaurant,
      id: Date.now().toString(),
      joinedDate: new Date(),
    };
    setState(prev => ({
      ...prev,
      restaurants: [newRestaurant, ...prev.restaurants],
    }));
  };

  const updateRestaurant = (id, updates) => {
    setState(prev => ({
      ...prev,
      restaurants: prev.restaurants.map(restaurant =>
        restaurant.id === id ? { ...restaurant, ...updates } : restaurant
      ),
    }));
  };

  const deleteRestaurant = (id) => {
    setState(prev => ({
      ...prev,
      restaurants: prev.restaurants.filter(restaurant => restaurant.id !== id),
    }));
  };

  const blockRestaurant = (id) => {
    updateRestaurant(id, { status: "blocked" });
  };

  const unblockRestaurant = (id) => {
    updateRestaurant(id, { status: "active" });
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date(),
      restaurantCount: 0,
    };
    setState(prev => ({
      ...prev,
      categories: [newCategory, ...prev.categories],
    }));
  };

  const updateCategory = (id, updates) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === id ? { ...category, ...updates } : category
      ),
    }));
  };

  const deleteCategory = (id) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category.id !== id),
    }));
  };

  const setSearchTerm = (term) => {
    setState(prev => ({ ...prev, searchTerm: term, currentPage: 1 }));
  };

  const setStatusFilter = (filter) => {
    setState(prev => ({ ...prev, statusFilter: filter, currentPage: 1 }));
  };

  const setCurrentPage = (page) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const getFilteredRestaurants = () => {
    let filtered = state.restaurants;

    if (state.searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        restaurant.state.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.statusFilter !== "all") {
      filtered = filtered.filter(restaurant => restaurant.status === state.statusFilter);
    }

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    return filtered.slice(startIndex, startIndex + state.itemsPerPage);
  };

  const getTotalPages = () => {
    let filtered = state.restaurants;

    if (state.searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        restaurant.state.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.statusFilter !== "all") {
      filtered = filtered.filter(restaurant => restaurant.status === state.statusFilter);
    }

    return Math.ceil(filtered.length / state.itemsPerPage);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
        blockRestaurant,
        unblockRestaurant,
        addCategory,
        updateCategory,
        deleteCategory,
        setSearchTerm,
        setStatusFilter,
        setCurrentPage,
        getFilteredRestaurants,
        getTotalPages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
