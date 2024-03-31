import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/global/layout";
import InnerPageLayout from "../components/inner-page-layout";
import PropertyCard from "../components/property-card";
import { API_URL } from "../config";

const SearchSale = ({ property }) => {
  const { data } = property;

  const propertySale = data?.filter(
    (property) =>
      property.attributes.categories.data[0]?.attributes.categoryname === "sale"
  );

  const router = useRouter();
  const search = router.query.query;

  const searchProperty = propertySale?.filter((item) =>
    item?.attributes.title.toLowerCase().includes(search)
  );

  return (
    <Layout title={`Search property with ${search}`}>
      <InnerPageLayout title={`Search property with "${search}" in sale`} />
      <div className="search-page all-property section-padding">
        <div className="container">
          <div className="row justify-content-center">
            {searchProperty && searchProperty.length > 0 ? (
              searchProperty.map((property) => (
                <PropertyCard property={property} key={property.id} />
              ))
            ) : (
              <span className="error">Search property not available</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchSale;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/properties?populate=*`);
  const property = await res.json();

  return {
    props: { property },
  };
}
