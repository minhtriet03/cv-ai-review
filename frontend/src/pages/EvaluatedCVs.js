import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const EvaluatedCVs = () => {
  const [evaluatedCVs, setEvaluatedCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluatedCVs = async () => {
      try {
        const response = await api.get('/cv/evaluated-cvs', { withCredentials: true });
        setEvaluatedCVs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching evaluated CVs:', error);
        if (error.response?.data?.code === 'TOKEN_EXPIRED') {
          // Nếu token hết hạn, chuyển hướng về trang login
          navigate('/login');
        } else if (error.response.status === 401) {
          setError('Không thể tải danh sách CV. Vui lòng đăng nhập.');
        }else{
          setError('không thể tải Cv chức năng hiện đang lỗi!');
        }
        setLoading(false);
      }
    };

    fetchEvaluatedCVs();
  }, [navigate]);

  // Hàm format giống Section 2
  const formatReview = (reviewText) => {
    if (!reviewText) return null;
    const sections = reviewText.split(/\d+\./g).filter((text) => text.trim());
    const scoreRegex = /(\d+(?:\.\d+)?\s*\/\s*10)/;
    return (
      <ul className="list-group list-group-flush">
        {sections.map((section, index) => {
          const match = section.match(scoreRegex);
          let score = null;
          let content = section;
          if (match) {
            score = match[1];
            content = section.replace(scoreRegex, '').replace(':', '').trim();
          }
          return (
            <li
              key={index}
              className="list-group-item d-flex flex-column justify-content-between align-items-start shadow-sm"
              style={{
                borderRadius: '12px',
                marginBottom: '16px',
                background: '#fff',
                border: '1px solid #e3e3e3',
                transition: 'box-shadow 0.2s',
                cursor: 'default',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: '18px 20px',
                minHeight: '70px',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#2d3a4b',
                  marginBottom: 6,
                  wordBreak: 'break-word',
                  maxHeight: '450px',
                  overflowY: 'auto',
                  width: '100%',
                  paddingRight: 4,
                }}
              >
                <span>{index + 1}.</span>
                {content.split(/\s*-\s*/).map((part, idx) => (
                  idx === 0 ? (
                    <span key={idx} style={{ marginLeft: 8, fontSize: 16, fontWeight: 400 }}>{part}</span>
                  ) : (
                    <div key={idx} style={{ marginLeft: 24, fontSize: 15, fontWeight: 400, color: '#444', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ marginRight: 6, color: '#bbb' }}>-</span>
                      <span>{part}</span>
                    </div>
                  )
                ))}
              </div>
              {score && (
                <span
                  className="badge bg-success fs-5 d-flex align-items-center justify-content-center mt-2"
                  style={{
                    minWidth: '70px',
                    height: '38px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: 18,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    alignSelf: 'center',
                  }}
                >
                  <i className="bi bi-star-fill" style={{ marginRight: 6, color: '#fff700' }}></i>
                  {score}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Danh sách CV đã được AI đánh giá</h2>
      <div className="table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead className="table-primary">
            <tr>
              <th>Tên CV</th>
              <th>Ngày đánh giá</th>
              <th>Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {evaluatedCVs.map((cv) => (
              <tr key={cv._id}>
                <td>{cv.fileName}</td>
                <td>{new Date(cv.uploadedAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => { setSelectedReview(cv.review); setShowModal(true); }}
                  >
                    Xem chi tiết
                  </Button>
                </td>
              </tr>
            ))}
            {evaluatedCVs.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">
                  Chưa có CV nào được đánh giá
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá chi tiết CV</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto', background: '#f8f9fa' }}>
          {formatReview(selectedReview)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EvaluatedCVs; 