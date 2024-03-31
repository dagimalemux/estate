import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/global/layout";
import InnerPageLayout from "../components/inner-page-layout";
import PropertyCard from "../components/property-card";
import { API_URL } from "../config";

const SearchRent = ({ property }) => {
  const { data } = property;

  // Filter properties for rent
  const propertyRent = data?.filter(
    (property) =>
      property.attributes.categories.data[0]?.attributes.categoryname === "rent"
  );

  const router = useRouter();
  const search = router.query.query;

  // Case-insensitive search
  const searchProperty = propertyRent?.filter((item) =>
    item?.attributes.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title={`Search property with ${search}`}>
      <InnerPageLayout title="Search property with rent" />
      <div className="search-page all-property section-padding">
        <div className="container">
          <div className="row justify-content-center">
            {searchProperty && searchProperty.length === 0 ? (
              <span className="error">Search property not available</span>
            ) : (
              <>
                {searchProperty?.map((propertyItem) => (
                  <PropertyCard property={propertyItem} key={propertyItem.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchRent;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/properties?populate=*`);
  const property = await res.json();

  return {
    props: { property },
  };
}
