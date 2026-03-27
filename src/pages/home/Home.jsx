import React from "react";
import Products from "../../components/products/Products";
import CategoriesSection from "../../components/categories/CategoriesSection";
export default function Home(){
    return (
        <div>
            <CategoriesSection/>
            <Products/>
        </div>
    )
}