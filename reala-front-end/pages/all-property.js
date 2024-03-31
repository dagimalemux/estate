import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Layout from "../components/global/layout";
import { API_URL } from "../config";
import AllPropertyNav from "../components/all-property-nav";
import PropertyCard from "../components/property-card";
import ProductListCard from "../components/product-list-card";
import InnerPageLayout from "../components/inner-page-layout";
import Pagination from "../components/pagination";

const AllProperty = ({ property }) => {
  const { data } = property;
  const [view, setView] = useState('rent'); // Set default view to 'rent'
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const propertyRent = data?.filter(
    (property) =>
      property.attributes.categories.data[0]?.attributes.categoryname === "rent"
  );
  const propertySale = data?.filter(
    (property) =>
      property.attributes.categories.data[0]?.attributes.categoryname === "sale"
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const propertyData = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <InnerPageLayout title="All Property" />
      <div className="all-property featured-list section-padding">
        <div className="container">
          <AllPropertyNav setView={setView} view={view} data={data} />
          <div id="property-list">
            <Tabs activeKey={view} onSelect={(k) => setView(k)}>
              <Tab id="controlled-tab-example" eventKey="all" title="All">
                <div className="row">
                  {!data || data.length === 0 ? (
                    <span className="error">Property not available</span>
                  ) : (
                    propertyData?.map((property) => (
                      <ProductListCard property={property} key={property.id} />
                    ))
                  )}
                </div>
                {data && data.length > 6 && (
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    paginate={paginate}
                  />
                )}
              </Tab>
              <Tab eventKey="rent" title="Rent">
                <div className="row">
                  {!data || data.length === 0 ? (
                    <span className="error">Property not available</span>
                  ) : (
                    propertyRent?.map((property) => (
                      <PropertyCard property={property} key={property.id} />
                    ))
                  )}
                </div>
              </Tab>
              <Tab eventKey="sale" title="Sale">
                <div className="row">
                  {!data || data.length === 0 ? (
                    <span className="error">Property not available</span>
                  ) : (
                    propertySale?.map((property) => (
                      <PropertyCard property={property} key={property.id} />
                    ))
                  )}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProperty;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/properties?populate=*`);
  const property = await res.json();

  return {
    props: { property },
  };
}
