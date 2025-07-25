import React, { useState, useEffect } from 'react';
import './FieldForm.css';
import { addFields, deleteField, getFields, reorderField, updatesField } from '../../../../../../api/admin/category/category';
import Notification from '../../../../../notification/notification';

const FieldForm = ({ categoryId, subcategoryId }) => {
  const [fields, setFields] = useState([]);
  const [existingFields, setExistingFields] = useState([]);
  const [currentField, setCurrentField] = useState({
    type: 'text',
    label: '',
    key: '',
    isRequired: false,
    placeholder: '',
    options: [],
    validation: {}
  });
  const [newOption, setNewOption] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch existing fields when component mounts

  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const moveField = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= existingFields.length) return;
    
    const reordered = [...existingFields];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setExistingFields(reordered);
  };

  const saveFieldOrder = async () => {
    setIsSavingOrder(true);
    try {


      // await axios.put(
      //   `/api/categories/${categoryId}/subcategories/${subcategoryId}/fields/reorder`,
      //   { fieldOrder: existingFields.map(f => f._id) }
      // );

      const fieldOrder = existingFields.map(f => f._id)

      const response = await reorderField(categoryId, subcategoryId, fieldOrder);

      setMessage(response.message);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save field order');
    } finally {
      setIsSavingOrder(false);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await getFields(categoryId, subcategoryId);
      setExistingFields(response.fields || []);
    } catch (err) {
      setError(err.response?.message || 'Failed to fetch fields');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    
    fetchFields();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentField(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleValidationChange = (e) => {
    const { name, value } = e.target;
    setCurrentField(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        [name]: value ? (name.includes('Length') ? parseInt(value) : value) : undefined
      }
    }));
  };

  const addOption = () => {
    if (newOption.trim()) {
      setCurrentField(prev => ({
        ...prev,
        options: [...prev.options, newOption.trim()]
      }));
      setNewOption('');
    }
  };

  const removeOption = (index) => {
    setCurrentField(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setCurrentField({
      type: 'text',
      label: '',
      key: '',
      isRequired: false,
      placeholder: '',
      options: [],
      validation: {}
    });
    setIsEditing(false);
    setEditingFieldId(null);
  };

  const addField = () => {
    if (!currentField.label || !currentField.key) {
      setError('Label and Key are required');
      return;
    }

    setFields(prev => [...prev, currentField]);
    resetForm();
  };

  const removeField = (index) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  const editField = (field) => {
    setCurrentField({
      type: field.type,
      label: field.label,
      key: field.key,
      isRequired: field.isRequired,
      placeholder: field.placeholder || '',
      options: field.options || [],
      validation: field.validation || {}
    });
    setIsEditing(true);
    setEditingFieldId(field._id);
  };

  const updateField = async () => {
    if (!currentField.label || !currentField.key) {
      setError('Label and Key are required');
      return;
    }

    try {
      
      const response = await updatesField(categoryId, subcategoryId, editingFieldId, currentField);
      // Update the existing fields list
      setMessage(response.message);
      setExistingFields(prev => 
        prev.map(f => 
          f._id === editingFieldId ? response.field : f
        )
      );
      
      resetForm();
      setError(null);
      fetchFields();
    } catch (err) {
      setError(err.response?.message || 'Failed to update field');
    }
  };

  const deleteExistingField = async (fieldId) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      try {
        // await axios.delete(
        //   `/api/categories/${categoryId}/subcategories/${subcategoryId}/fields/${fieldId}`
        // );

        const response = await deleteField(categoryId, subcategoryId, fieldId);

        setMessage(response.message);
        
        // Remove from existing fields list
        setExistingFields(prev => prev.filter(f => f._id !== fieldId));
        fetchFields();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete field');
      }
    }
  };

  const submitFields = async () => {
    try {
      
      const response = await addFields(categoryId, subcategoryId, fields);
      // Add the new fields to the existing fields list
      // setExistingFields(prev => [...prev, ...response.data.fields]);
      setMessage(response.message);
      setFields([]);
      setError(null);
      fetchFields()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add fields');
    }
  };

  if (isLoading) {
    return <div className="field-form-loading">Loading fields...</div>;
  }

  return (
    <>
      <Notification  
        message={message}
        noMessage={() => setMessage('')}
        type='success'
      />
      <div className="field-form-container">
            {/* <h2 className="field-form-title">Manage Subcategory Fields</h2> */}
        
        {error && (
          <div className="field-form-error">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="field-form-card">
          <h3 className="field-form-subtitle">
            {isEditing ? 'Edit Field' : 'Add New Field'}
          </h3>
          
          <div className="field-form-grid">
            <div className="field-form-group">
              <label className="field-form-label">Field Type</label>
              <select
                name="type"
                value={currentField.type}
                onChange={handleInputChange}
                className="field-form-select"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            </div>

            <div className="field-form-group">
              <label className="field-form-label">Label</label>
              <input
                type="text"
                name="label"
                value={currentField.label}
                onChange={handleInputChange}
                className="field-form-input"
                required
              />
            </div>
          </div>

          <div className="field-form-grid">
            <div className="field-form-group">
              <label className="field-form-label">Key (unique identifier)</label>
              <input
                type="text"
                name="key"
                value={currentField.key}
                onChange={handleInputChange}
                className="field-form-input"
                required
              />
            </div>

            <div className="field-form-checkbox-container">
              <div className="field-form-checkbox-group">
                <input
                  type="checkbox"
                  name="isRequired"
                  checked={currentField.isRequired}
                  onChange={handleInputChange}
                  className="field-form-checkbox"
                />
                <label className="field-form-checkbox-label">Required Field</label>
              </div>
            </div>
          </div>

          <div className="field-form-group">
            <label className="field-form-label">Placeholder (optional)</label>
            <input
              type="text"
              name="placeholder"
              value={currentField.placeholder}
              onChange={handleInputChange}
              className="field-form-input"
            />
          </div>

          {(currentField.type === 'dropdown' || currentField.type === 'radio') && (
            <div className="field-form-group">
              <label className="field-form-label">Options</label>
              <div className="field-form-option-container">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="field-form-option-input"
                  placeholder="Add new option"
                />
                <button
                  type="button"
                  onClick={addOption}
                  className="field-form-option-button"
                >
                  Add
                </button>
              </div>
              <div className="field-form-option-list">
                {currentField.options.map((option, index) => (
                  <div key={index} className="field-form-option-item">
                    <span>{option}</span>
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="field-form-option-remove"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="field-form-grid">
            {currentField.type === 'number' && (
              <>
                <div className="field-form-group">
                  <label className="field-form-label">Min Value</label>
                  <input
                    type="number"
                    name="min"
                    value={currentField.validation.min || ''}
                    onChange={handleValidationChange}
                    className="field-form-input"
                  />
                </div>
                <div className="field-form-group">
                  <label className="field-form-label">Max Value</label>
                  <input
                    type="number"
                    name="max"
                    value={currentField.validation.max || ''}
                    onChange={handleValidationChange}
                    className="field-form-input"
                  />
                </div>
              </>
            )}
            {currentField.type === 'text' && (
              <>
                <div className="field-form-group">
                  <label className="field-form-label">Min Length</label>
                  <input
                    type="number"
                    name="minLength"
                    value={currentField.validation.minLength || ''}
                    onChange={handleValidationChange}
                    className="field-form-input"
                  />
                </div>
                <div className="field-form-group">
                  <label className="field-form-label">Max Length</label>
                  <input
                    type="number"
                    name="maxLength"
                    value={currentField.validation.maxLength || ''}
                    onChange={handleValidationChange}
                    className="field-form-input"
                  />
                </div>
              </>
            )}
          </div>

          <div className="field-form-actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={updateField}
                  className="field-form-update-button"
                >
                  Update Field
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="field-form-cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={addField}
                className="field-form-primary-button"
              >
                Add Field
              </button>
            )}
          </div>
        </div>

        {/* Existing Fields Section */}
<div className="field-form-card">
  <h3 className="field-form-subtitle">Existing Fields</h3>
  {existingFields.length === 0 ? (
    <p className="field-form-no-fields">No fields exist for this subcategory yet.</p>
  ) : (
    <div className="field-form-existing-container">
      {existingFields.map((field, index) => (
        <div key={field._id} className="field-form-existing-item">
          {/* Move Controls */}
          <div className="field-reorder-controls">
            <button
              onClick={() => moveField(index, index - 1)}
              disabled={index === 0}
              aria-label="Move up"
              className="move-button"
            >
              ↑
            </button>
            <button
              onClick={() => moveField(index, index + 1)}
              disabled={index === existingFields.length - 1}
              aria-label="Move down"
              className="move-button"
            >
              ↓
            </button>
          </div>

          {/* Field Content */}
          <div className="field-form-existing-content">
            <h4 className="field-form-existing-title">
              {field.label} ({field.type})
              {field.isRequired && (
                <span className="field-form-required-badge">Required</span>
              )}
            </h4>
            <p className="field-form-existing-text">Key: {field.key}</p>
            {field.options.length > 0 && (
              <div className="field-form-existing-options">
                <p>Options:</p>
                <ul>
                  {field.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="field-form-existing-actions">
            <button
              type="button"
              onClick={() => editField(field)}
              className="field-form-edit-button"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => deleteExistingField(field._id)}
              className="field-form-delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Save Order Button (only shown when fields exist) */}
  {existingFields.length > 0 && (
    <div className="save-order-container">
      <button
        onClick={saveFieldOrder}
        disabled={isSavingOrder}
        className="save-order-button"
      >
        {isSavingOrder ? 'Saving...' : 'Save Order'}
      </button>
    </div>
  )}
</div>

        {/* New Fields to be Added Section */}
        {fields.length > 0 && (
          <div className="field-form-card">
            <h3 className="field-form-subtitle">Fields to be Added</h3>
            <div className="field-form-preview-container">
              {fields.map((field, index) => (
                <div key={index} className="field-form-preview-item">
                  <div className="field-form-preview-content">
                    <h4 className="field-form-preview-title">{field.label} ({field.type})</h4>
                    <p className="field-form-preview-text">Key: {field.key}</p>
                    {field.isRequired && <span className="field-form-required-badge">Required</span>}
                    {field.options.length > 0 && (
                      <div className="field-form-preview-options">
                        <p className="field-form-preview-options-title">Options:</p>
                        <ul className="field-form-preview-options-list">
                          {field.options.map((opt, i) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="field-form-remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={submitFields}
              className="field-form-submit-button"
            >
              Submit All Fields
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default FieldForm;