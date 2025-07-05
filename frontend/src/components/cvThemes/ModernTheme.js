import React from 'react';

const ModernTheme = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects, languages, certifications } = data || {};

  // Helper function to safely access nested properties
  const safeGet = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  };

  // Helper function to safely map arrays
  const safeMap = (array, renderFn) => {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array.filter(item => item && typeof item === 'object').map(renderFn);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#333'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: '0 0 10px 0',
          fontWeight: 'bold'
        }}>
          {safeGet(personalInfo, 'fullName', 'Họ và tên')}
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          margin: '0 0 20px 0',
          opacity: 0.9
        }}>
          {safeGet(experience, '0.position', 'Vị trí công việc')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {safeGet(personalInfo, 'email') && (
            <span style={{ fontSize: '0.9rem' }}>📧 {personalInfo.email}</span>
          )}
          {safeGet(personalInfo, 'phone') && (
            <span style={{ fontSize: '0.9rem' }}>📱 {personalInfo.phone}</span>
          )}
          {safeGet(personalInfo, 'linkedin') && (
            <span style={{ fontSize: '0.9rem' }}>💼 {personalInfo.linkedin}</span>
          )}
        </div>
        {safeGet(personalInfo, 'address') && (
          <p style={{ fontSize: '0.9rem', margin: '10px 0 0 0', opacity: 0.8 }}>
            📍 {personalInfo.address}
          </p>
        )}
         {safeGet(personalInfo, 'website') && (
          <p style={{ fontSize: '0.9rem', margin: '10px 0 0 0', opacity: 0.8 }}>
          🌐 {personalInfo.website}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '15px'
            }}>
              Tóm tắt
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Kinh nghiệm làm việc
            </h2>
            {safeMap(experience, (exp, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#333' }}>
                    {safeGet(exp, 'position', 'Vị trí')}
                  </h3>
                  <span style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 'bold' }}>
                    {safeGet(exp, 'startDate', '')} - {safeGet(exp, 'endDate', '')}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', color: '#667eea', margin: '5px 0', fontWeight: 'bold' }}>
                  {safeGet(exp, 'company', 'Công ty')}
                </p>
                {safeGet(exp, 'description') && (
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#666', margin: 0 }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Học vấn
            </h2>
            {safeMap(education, (edu, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#333' }}>
                    {safeGet(edu, 'degree', 'Bằng cấp')}
                  </h3>
                  <span style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 'bold' }}>
                    {safeGet(edu, 'year', '')}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', color: '#667eea', margin: '5px 0', fontWeight: 'bold' }}>
                  {safeGet(edu, 'school', 'Trường học')}
                </p>
                {safeGet(edu, 'gpa') && (
                  <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Kỹ năng
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {safeMap(skills, (skill, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {safeGet(skill, 'name', 'Kỹ năng')} {safeGet(skill, 'level') && `(${skill.level})`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Dự án
            </h2>
            {safeMap(projects, (project, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#333' }}>
                    {safeGet(project, 'name', 'Tên dự án')}
                  </h3>
                  {safeGet(project, 'url') && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ 
                      fontSize: '0.9rem', 
                      color: '#667eea',
                      textDecoration: 'none'
                    }}>
                      🔗 Xem dự án
                    </a>
                  )}
                </div>
                {safeGet(project, 'description') && (
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#666', margin: 0 }}>
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Ngôn ngữ
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {safeMap(languages, (lang, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
                    {safeGet(lang, 'name', 'Ngôn ngữ')}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#667eea' }}>
                    {safeGet(lang, 'level', '')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Chứng chỉ
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {safeMap(certifications, (cert, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  minWidth: '150px'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
                    {safeGet(cert, 'name', 'Chứng chỉ')}
                  </div>
                  {safeGet(cert, 'year') && (
                    <div style={{ fontSize: '0.9rem', color: '#667eea' }}>
                      {cert.year}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTheme; 