import React from 'react'
import './coLiving.css';
import coLivingList from './coLivingList';
import CoLivingComponent from './CoLivingComponent';
const CoLiving = () => {
  return (
    <>
    <div className="container">
      <h2>People searching for room mates <i className="fa fa-hotel"></i></h2>
    <div className="co-living-container">
      {coLivingList.map((clist)=>(
        <CoLivingComponent 
        key={clist.id}
        searchername={clist.searchername}
        location={clist.location}
        building={clist.building}
        type={clist.type}
        rent={clist.rent}
        splitpercentage={clist.splitpercentage}
        description={clist.description}
        image={clist.image}
        />
      ))}
    </div>
    </div>
    </>
  )
}

export default CoLiving
