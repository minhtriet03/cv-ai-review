import React from 'react';

const ClassicTheme = ({ data }) => {
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
      fontFamily: 'Times New Roman, serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#2c3e50',
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <div style={{ 
        borderBottom: '3px solid #2c3e50',
        paddingBottom: '20px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.8rem', 
          margin: '0 0 10px 0',
          fontWeight: 'bold',
          color: '#2c3e50',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          {safeGet(personalInfo, 'fullName', 'Họ và tên')}
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          margin: '0 0 15px 0',
          color: '#34495e',
          fontStyle: 'italic'
        }}>
          {safeGet(experience, '0.position', 'Vị trí công việc')}
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          flexWrap: 'wrap',
          fontSize: '1rem'
        }}>
          {safeGet(personalInfo, 'email') && (
            <span>📧 {personalInfo.email}</span>
          )}
          {safeGet(personalInfo, 'phone') && (
            <span>📱 {personalInfo.phone}</span>
          )}
          {safeGet(personalInfo, 'linkedin') && (
            <span>💼 {personalInfo.linkedin}</span>
          )}
        </div>
        {safeGet(personalInfo, 'address') && (
          <p style={{ fontSize: '1rem', margin: '10px 0 0 0', color: '#7f8c8d' }}>
            📍 {personalInfo.address}
          </p>
        )}
         {safeGet(personalInfo, 'website') && (
          <p style={{ fontSize: '1rem', margin: '10px 0 0 0', color: '#7f8c8d' }}>
            🌐 {personalInfo.website}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Tóm tắt
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#34495e', textAlign: 'justify' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Kinh nghiệm làm việc
            </h2>
            {safeMap(experience, (exp, index) => (
              <div key={index} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>
                    {safeGet(exp, 'position', 'Vị trí')}
                  </h3>
                  <span style={{ fontSize: '1rem', color: '#7f8c8d', fontStyle: 'italic' }}>
                    {safeGet(exp, 'startDate', '')} - {safeGet(exp, 'endDate', '')}
                  </span>
                </div>
                <p style={{ fontSize: '1.1rem', color: '#34495e', margin: '5px 0 10px 0', fontWeight: 'bold' }}>
                  {safeGet(exp, 'company', 'Công ty')}
                </p>
                {safeGet(exp, 'description') && (
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#34495e', margin: 0, textAlign: 'justify' }}>
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
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Học vấn
            </h2>
            {safeMap(education, (edu, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>
                    {safeGet(edu, 'degree', 'Bằng cấp')}
                  </h3>
                  <span style={{ fontSize: '1rem', color: '#7f8c8d', fontStyle: 'italic' }}>
                    {safeGet(edu, 'year', '')}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', color: '#34495e', margin: '5px 0', fontWeight: 'bold' }}>
                  {safeGet(edu, 'school', 'Trường học')}
                </p>
                {safeGet(edu, 'gpa') && (
                  <p style={{ fontSize: '0.95rem', color: '#7f8c8d', margin: 0 }}>
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
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Kỹ năng
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {safeMap(skills, (skill, index) => (
                <div key={index} style={{
                  border: '1px solid #bdc3c7',
                  padding: '12px 15px',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2c3e50' }}>
                    {safeGet(skill, 'name', 'Kỹ năng')}
                  </div>
                  {safeGet(skill, 'level') && (
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '5px' }}>
                      {skill.level}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Dự án
            </h2>
            {safeMap(projects, (project, index) => (
              <div key={index} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>
                    {safeGet(project, 'name', 'Tên dự án')}
                  </h3>
                  {safeGet(project, 'url') && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ 
                      fontSize: '0.9rem', 
                      color: '#3498db',
                      textDecoration: 'underline'
                    }}>
                      Xem dự án
                    </a>
                  )}
                </div>
                {safeGet(project, 'description') && (
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#34495e', margin: 0, textAlign: 'justify' }}>
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
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Ngôn ngữ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {safeMap(languages, (lang, index) => (
                <div key={index} style={{
                  border: '1px solid #bdc3c7',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2c3e50' }}>
                    {safeGet(lang, 'name', 'Ngôn ngữ')}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '5px' }}>
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
              fontSize: '1.4rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '8px',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Chứng chỉ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {safeMap(certifications, (cert, index) => (
                <div key={index} style={{
                  border: '1px solid #bdc3c7',
                  padding: '12px 15px',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2c3e50' }}>
                    {safeGet(cert, 'name', 'Chứng chỉ')}
                  </div>
                  {safeGet(cert, 'year') && (
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '5px' }}>
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

export default ClassicTheme; 