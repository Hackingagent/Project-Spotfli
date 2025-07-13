import React from 'react';
import { FaCheck, FaTimes, FaPause, FaFileAlt, FaUser, FaTools, FaCalendarAlt } from 'react-icons/fa';
import './ViewProvider.css'; // We'll create this next

const ViewProviderModal = ({
  show,
  onClose,
  application,
  currentStatusPage, // 'pending', 'approved', or 'declined'
  onApprove,
  onDecline,
  isLoading
}) => {
  if (!show) return null;

  const getStatusBadge = () => {
    const status = application?.status;
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
          <h2>Service Application {getStatusBadge()}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {application && (
            <>
              <div className="info-section">
                <h3><FaUser /> Applicant Information</h3>
                <div className="info-grid">
                  <div>
                    <label>First_Name:</label>
                    <p>{application.userDetails?.first_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label>Last_Name:</label>
                    <p>{application.userDetails?.last_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label>Email:</label>
                    <p>{application.userDetails?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="info-grid">
                  <div>
                    <label>Phone:</label>
                    <p>{application.userDetails?.tell || 'N/A'}</p>
                  </div>
                  
                </div>
              </div>


                {/* Service Information */}
              <div className="info-section">
                <h3><FaTools /> Service Details</h3>
                <div className="info-grid">
                  <div>
                    <label>Business Name</label>
                    <p>{application.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label>Category</label>
                    <p>{application.service }</p>
                  </div>
                  <div>
                    <label>Business Email</label>
                    <p>{application.email || application.userDetails.email}</p>
                  </div>
                </div>


                <div className="info-grid">
                  <div>
                    <label>Business Phone</label>
                    <p>{application.tell || application.userDetails.tell || 'N/A'}</p>
                  </div>
                  <div>
                    <label>Experience</label>
                    <p>{application.experience } years</p>
                  </div>
                  <div>
                    <label>Portfolio/Website</label>
                    <p>{application.website || 'N/A'}</p>
                  </div>
                </div>

                <div className="info-grid">
                  <div>
                    <label><FaCalendarAlt /> Applied On:</label>
                    <p>{new Date(application.appliedOn).toLocaleDateString()}</p>
                  </div>
                  {/* <div>
                    <label>Experience</label>
                    <p>{application.experience } years</p>
                  </div>
                  <div>
                    <label><FaCalendarAlt />Portfolio/Website</label>
                    <p>{application.website}</p>
                  </div> */}
                </div>
              </div>

              <div className="documents-section">
                <h3><FaFileAlt /> Application Documents</h3>
                {application.documents?.length > 0 ? (
                  <div className="documents-grid">
                    {application.documents.map((doc, index) => (
                      <a 
                        key={index} 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="document-item"
                      >
                        <FaFileAlt className="doc-icon" />
                        {doc.name || `Document ${index + 1}`}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="no-documents">No documents submitted</p>
                )}
              </div>

              {application.rejectionReason && (
                <div className="rejection-reason">
                  <h4>Rejection Reason:</h4>
                  <p>{application.rejectionReason}</p>
                </div>
              )}
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

export default ViewProviderModal;