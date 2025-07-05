import React from 'react';

const ProfessionalTheme = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects, languages, certifications } = data;

  return (
    <div style={{ 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#1a1a1a'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#1a1a1a',
        color: 'white',
        padding: '30px 40px',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(90deg, #007acc, #00d4aa, #ff6b35)'
        }} />
        <h1 style={{ 
          fontSize: '2.4rem', 
          margin: '0 0 8px 0',
          fontWeight: '300',
          letterSpacing: '1px'
        }}>
          {personalInfo?.fullName || 'Họ và tên'}
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '0 0 20px 0',
          color: '#00d4aa',
          fontWeight: '500'
        }}>
          {experience?.[0]?.position || 'Vị trí công việc'}
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          fontSize: '0.9rem'
        }}>
          {personalInfo?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#00d4aa' }}>📧</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#00d4aa' }}>📱</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#00d4aa' }}>💼</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#00d4aa' }}>📍</span>
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#00d4aa' }}>🌐</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              TÓM TẮT
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              color: '#4a4a4a',
              margin: 0,
              textAlign: 'justify'
            }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '20px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              KINH NGHIỆM LÀM VIỆC
            </h2>
            {experience.map((exp, index) => (
              <div key={index} style={{ 
                marginBottom: '25px',
                padding: '20px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 5px 0', color: '#1a1a1a', fontWeight: '600' }}>
                      {exp.position}
                    </h3>
                    <p style={{ fontSize: '1rem', margin: 0, color: '#007acc', fontWeight: '500' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#666',
                    backgroundColor: '#e8e8e8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: '1.6', 
                    color: '#4a4a4a', 
                    margin: 0,
                    textAlign: 'justify'
                  }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '20px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              HỌC VẤN
            </h2>
            {education.map((edu, index) => (
              <div key={index} style={{ 
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 5px 0', color: '#1a1a1a', fontWeight: '600' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '0.95rem', margin: 0, color: '#007acc', fontWeight: '500' }}>
                      {edu.school}
                    </p>
                  </div>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#666',
                    backgroundColor: '#e8e8e8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    {edu.year}
                  </span>
                </div>
                {edu.gpa && (
                  <p style={{ fontSize: '0.9rem', color: '#666', margin: '8px 0 0 0' }}>
                    GPA: <strong>{edu.gpa}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '20px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              KỸ NĂNG
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid #dee2e6',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  cursor: 'default'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '5px' }}>
                    {skill.name}
                  </div>
                  {skill.level && (
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#007acc',
                      fontWeight: '500',
                      backgroundColor: 'rgba(0, 122, 204, 0.1)',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      display: 'inline-block'
                    }}>
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
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '20px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              DỰ ÁN
            </h2>
            {projects.map((project, index) => (
              <div key={index} style={{ 
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#1a1a1a', fontWeight: '600' }}>
                    {project.name}
                  </h3>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ 
                      fontSize: '0.9rem', 
                      color: '#007acc',
                      textDecoration: 'none',
                      backgroundColor: 'rgba(0, 122, 204, 0.1)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }}>
                      🔗 Xem dự án
                    </a>
                  )}
                </div>
                {project.description && (
                  <p style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: '1.6', 
                    color: '#4a4a4a', 
                    margin: 0,
                    textAlign: 'justify'
                  }}>
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '20px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              NGÔN NGỮ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid #dee2e6',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                    {lang.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#00d4aa',
                    fontWeight: '500',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    display: 'inline-block'
                  }}>
                    {lang.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#1a1a1a',
              marginBottom: '20px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '15px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '4px', 
                height: '20px', 
                background: '#007acc' 
              }} />
              CHỨNG CHỈ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid #dee2e6',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                    {cert.name}
                  </div>
                  {cert.year && (
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#ff6b35',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      display: 'inline-block'
                    }}>
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

export default ProfessionalTheme; 