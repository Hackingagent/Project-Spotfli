import React from 'react';
import { FaCheck, FaTimes, FaPause, FaFileAlt, FaUser, FaTools, FaCalendarAlt } from 'react-icons/fa';
// import './ViewProvider.css'; // We'll create this next
import './ViewProperty.css';

const ViewPropertyModal = ({
  show,
  onClose,
  property,
  currentStatusPage, // 'pending', 'approved', or 'declined'
  onApprove,
  onDecline,
  isLoading
}) => {
  if (!show) return null;

  const getStatusBadge = () => {
    const status = property?.status;
    return (
      <span className={`status-badge ${status}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const renderActionButtons = () => {
    switch (currentStatusPage) {
      case 'Pending':
        return (
          <div className="modal-actions">
            <button 
              className="approve-btn"
              onClick={onApprove}
              disabled={isLoading}
            >
              <FaCheck /> Approve
            </button>
            <button 
              className="reject-btn"
              onClick={onDecline}
              disabled={isLoading}
            >
              <FaTimes /> Decline
            </button>
          </div>
        );
      case 'Approved':
        return (
          <button 
              className="reject-btn"
             onClick={onDecline}
            disabled={isLoading}
          >
            <FaTimes /> Decline
          </button>
        );
      case 'Declined':
        return (
          <button 
            className="approve-btn"
            onClick={onApprove}
            disabled={isLoading}
          >
            <FaCheck /> Approve
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Property Information {getStatusBadge()}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {property && (
            <>
              <div className="info-section">
                <h3><FaUser /> Applicant Information</h3>
                <div className="info-grid">
                  <div>
                    <label>First_Name:</label>
                    <p>{property.userDetails?.first_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label>Last_Name:</label>
                    <p>{property.userDetails?.last_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label>Email:</label>
                    <p>{property.userDetails?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="info-grid">
                  <div>
                    <label>Phone:</label>
                    <p>{property.userDetails?.tell || 'N/A'}</p>
                  </div>
                  
                </div>
              </div>


                {/* Property Information */}
              
              <div className="info-section">
                <h3><FaTools /> Property Details</h3>
                {property.data && Object.entries(property.data).map(([key, value]) => (
                  <div className="property-grid" key={key}>
                      <label>{key}</label>
                      <p>{value || 'N/A'}</p>

                  </div>
                ))}
                
              </div>

              <div className="documents-section">
                <h3><FaFileAlt /> Application Documents</h3>
                {property.files?.length > 0 ? (
                  <div className="files-grid">
                    {property.files.map((file, index) => (
                      <div key={file._id} className='file'>
                        <img
                          src={`http://localhost:5000${file.url}`}
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-documents">No documents submitted</p>
                )}
              </div>

              {/* {application.rejectionReason && (
                <div className="rejection-reason">
                  <h4>Rejection Reason:</h4>
                  <p>{application.rejectionReason}</p>
                </div>
              )} */}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyModal;