import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FieldForm from './FieldForm';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../../../../navigation/admin/top-navigation';

const SubcategoryFieldsPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { subCategoryData } = location.state || {};

  if (!subCategoryData) {
    navigate(-1); // Go back if no data
    return null;
  }

  return (
    <>
      <TopNavigation 
        heading={`${subCategoryData.name} - Fields Management`}
        backButton={() => navigate(-1)}
      />

      
      <div className="p-4">
        <FieldForm 
          categoryId={categoryId} 
          subcategoryId={subcategoryId} 
          initialFields={subCategoryData.fields || []}
        />
      </div>
    </>
  );
};

export default SubcategoryFieldsPage;