import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Tạo component CV cho PDF
const createCVComponent = (theme, data) => {
  const themes = {
    modern: ModernTheme,
    classic: ClassicTheme,
    professional: ProfessionalTheme
  };
  
  const ThemeComponent = themes[theme];
  return ThemeComponent({ data });
};

// Import các theme components
const ModernTheme = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects, languages, certifications } = data;

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#333',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <h1 style={{ 
          fontSize: '2.2rem', 
          margin: '0 0 8px 0',
          fontWeight: 'bold'
        }}>
          {personalInfo?.fullName || 'Họ và tên'}
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '0 0 15px 0',
          opacity: 0.9
        }}>
          {experience?.[0]?.position || 'Vị trí công việc'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {personalInfo?.email && (
            <span style={{ fontSize: '0.85rem' }}>📧 {personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span style={{ fontSize: '0.85rem' }}>📱 {personalInfo.phone}</span>
          )}
          {personalInfo?.linkedin && (
            <span style={{ fontSize: '0.85rem' }}>💼 {personalInfo.linkedin}</span>
          )}
        </div>
        {personalInfo?.address && (
          <p style={{ fontSize: '0.85rem', margin: '8px 0 0 0', opacity: 0.8 }}>
            📍 {personalInfo.address}
          </p>
        )}
        {personalInfo?.website && (
          <p style={{ fontSize: '0.85rem', margin: '8px 0 0 0', opacity: 0.8 }}>
            🌐{personalInfo.website}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '25px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '12px'
            }}>
              Tóm tắt
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#666' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>
              Kinh nghiệm làm việc
            </h2>
            {experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#333' }}>
                    {exp.position}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 'bold' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#667eea', margin: '4px 0', fontWeight: 'bold' }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#34495e', margin: 0, textAlign: 'justify' }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>
              Học vấn
            </h2>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0, color: '#333' }}>
                    {edu.degree}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 'bold' }}>
                    {edu.year}
                  </span>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#667eea', margin: '4px 0', fontWeight: 'bold' }}>
                  {edu.school}
                </p>
                {edu.gpa && (
                  <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>
              Kỹ năng
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {skill.name} {skill.level && `(${skill.level})`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>
              Dự án
            </h2>
            {projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0, color: '#333' }}>
                    {project.name}
                  </h3>
                </div>
                {project.description && (
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#666', margin: 0 }}>
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>
              Ngôn ngữ
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#333' }}>
                    {lang.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#667eea' }}>
                    {lang.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              color: '#667eea',
              borderBottom: '2px solid #667eea',
              paddingBottom: '8px',
              marginBottom: '15px'
            }}>
              Chứng chỉ
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  minWidth: '140px'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#333' }}>
                    {cert.name}
                  </div>
                  {cert.year && (
                    <div style={{ fontSize: '0.85rem', color: '#667eea' }}>
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

const ClassicTheme = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects, languages, certifications } = data;

  return (
    <div style={{ 
      fontFamily: 'Times New Roman, serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#2c3e50',
      lineHeight: '1.5',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        borderBottom: '3px solid #2c3e50',
        paddingBottom: '15px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.4rem', 
          margin: '0 0 8px 0',
          fontWeight: 'bold',
          color: '#2c3e50',
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}>
          {personalInfo?.fullName || 'Họ và tên'}
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          margin: '0 0 12px 0',
          color: '#34495e',
          fontStyle: 'italic'
        }}>
          {experience?.[0]?.position || 'Vị trí công việc'}
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '25px', 
          flexWrap: 'wrap',
          fontSize: '0.95rem'
        }}>
          {personalInfo?.email && (
            <span>📧 {personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span>📱 {personalInfo.phone}</span>
          )}
          {personalInfo?.linkedin && (
            <span>💼 {personalInfo.linkedin}</span>
          )}
        </div>
        {personalInfo?.address && (
          <p style={{ fontSize: '0.95rem', margin: '8px 0 0 0', color: '#7f8c8d' }}>
            📍 {personalInfo.address}
          </p>
        )}
        {personalInfo?.website && (
          <p style={{ fontSize: '0.95rem', margin: '8px 0 0 0', color: '#7f8c8d' }}>
          🌐 {personalInfo.website}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0 15px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Tóm tắt
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#34495e', textAlign: 'justify' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Kinh nghiệm làm việc
            </h2>
            {experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>
                    {exp.position}
                  </h3>
                  <span style={{ fontSize: '0.9rem', color: '#7f8c8d', fontStyle: 'italic' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', color: '#34495e', margin: '4px 0 8px 0', fontWeight: 'bold' }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#34495e', margin: 0, textAlign: 'justify' }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Học vấn
            </h2>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>
                    {edu.degree}
                  </h3>
                  <span style={{ fontSize: '0.9rem', color: '#7f8c8d', fontStyle: 'italic' }}>
                    {edu.year}
                  </span>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#34495e', margin: '4px 0', fontWeight: 'bold' }}>
                  {edu.school}
                </p>
                {edu.gpa && (
                  <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: 0 }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Kỹ năng
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{
                  border: '1px solid #bdc3c7',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#2c3e50' }}>
                    {skill.name}
                  </div>
                  {skill.level && (
                    <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '4px' }}>
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
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Dự án
            </h2>
            {projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0, color: '#2c3e50', fontWeight: 'bold' }}>
                    {project.name}
                  </h3>
                </div>
                {project.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#34495e', margin: 0, textAlign: 'justify' }}>
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Ngôn ngữ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  border: '1px solid #bdc3c7',
                  padding: '8px 10px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#2c3e50' }}>
                    {lang.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '4px' }}>
                    {lang.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#2c3e50',
              borderBottom: '1px solid #bdc3c7',
              paddingBottom: '6px',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Chứng chỉ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  border: '1px solid #bdc3c7',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#2c3e50' }}>
                    {cert.name}
                  </div>
                  {cert.year && (
                    <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '4px' }}>
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

const ProfessionalTheme = ({ data }) => {
  const { personalInfo, summary, education, experience, skills, projects, languages, certifications } = data;

  return (
    <div style={{ 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#1a1a1a',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#1a1a1a',
        color: 'white',
        padding: '25px 30px',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '3px', 
          background: 'linear-gradient(90deg, #007acc, #00d4aa, #ff6b35)'
        }} />
        <h1 style={{ 
          fontSize: '2.2rem', 
          margin: '0 0 6px 0',
          fontWeight: '300',
          letterSpacing: '0.8px'
        }}>
          {personalInfo?.fullName || 'Họ và tên'}
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          margin: '0 0 15px 0',
          color: '#00d4aa',
          fontWeight: '500'
        }}>
          {experience?.[0]?.position || 'Vị trí công việc'}
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '12px',
          fontSize: '0.85rem'
        }}>
          {personalInfo?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#00d4aa' }}>📧</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#00d4aa' }}>📱</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#00d4aa' }}>💼</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#00d4aa' }}>📍</span>
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#00d4aa' }}>🌐</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '30px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '12px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              TÓM TẮT
            </h2>
            <p style={{ 
              fontSize: '0.95rem', 
              lineHeight: '1.6', 
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
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              KINH NGHIỆM LÀM VIỆC
            </h2>
            {experience.map((exp, index) => (
              <div key={index} style={{ 
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #e8e8e8',
                borderRadius: '6px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 4px 0', color: '#1a1a1a', fontWeight: '600' }}>
                      {exp.position}
                    </h3>
                    <p style={{ fontSize: '0.95rem', margin: 0, color: '#007acc', fontWeight: '500' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: '#666',
                    backgroundColor: '#e8e8e8',
                    padding: '3px 6px',
                    borderRadius: '3px',
                    fontWeight: '500'
                  }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ 
                    fontSize: '0.9rem', 
                    lineHeight: '1.5', 
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
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              HỌC VẤN
            </h2>
            {education.map((edu, index) => (
              <div key={index} style={{ 
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #e8e8e8',
                borderRadius: '6px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', margin: '0 0 4px 0', color: '#1a1a1a', fontWeight: '600' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#007acc', fontWeight: '500' }}>
                      {edu.school}
                    </p>
                  </div>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: '#666',
                    backgroundColor: '#e8e8e8',
                    padding: '3px 6px',
                    borderRadius: '3px',
                    fontWeight: '500'
                  }}>
                    {edu.year}
                  </span>
                </div>
                {edu.gpa && (
                  <p style={{ fontSize: '0.85rem', color: '#666', margin: '6px 0 0 0' }}>
                    GPA: <strong>{edu.gpa}</strong>
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
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              KỸ NĂNG
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid #dee2e6',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                    {skill.name}
                  </div>
                  {skill.level && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#007acc',
                      fontWeight: '500',
                      backgroundColor: 'rgba(0, 122, 204, 0.1)',
                      padding: '3px 6px',
                      borderRadius: '10px',
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
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              DỰ ÁN
            </h2>
            {projects.map((project, index) => (
              <div key={index} style={{ 
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #e8e8e8',
                borderRadius: '6px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0, color: '#1a1a1a', fontWeight: '600' }}>
                    {project.name}
                  </h3>
                </div>
                {project.description && (
                  <p style={{ 
                    fontSize: '0.9rem', 
                    lineHeight: '1.5', 
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
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              NGÔN NGỮ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid #dee2e6',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px' }}>
                    {lang.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#00d4aa',
                    fontWeight: '500',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    padding: '3px 6px',
                    borderRadius: '10px',
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
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              color: '#1a1a1a',
              marginBottom: '15px',
              fontWeight: '600',
              position: 'relative',
              paddingLeft: '12px'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: 0, 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '3px', 
                height: '18px', 
                background: '#007acc' 
              }} />
              CHỨNG CHỈ
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '1px solid #dee2e6',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px' }}>
                    {cert.name}
                  </div>
                  {cert.year && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#ff6b35',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      padding: '3px 6px',
                      borderRadius: '10px',
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

// Hàm xuất PDF
export const exportToPDF = async (theme, data) => {
  try {
    // Tạo element tạm thời để render CV
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '20px';
    document.body.appendChild(tempDiv);

    // Tạo nội dung CV dựa trên theme
    const cvContent = createCVContent(theme, data);
    tempDiv.innerHTML = cvContent;

    // Chờ một chút để content render xong
    await new Promise(resolve => setTimeout(resolve, 100));

    // Chụp ảnh element với scale thấp hơn để file nhẹ
    const canvas = await html2canvas(tempDiv, {
      scale: 0.9, // giảm scale xuống 90% để file nhẹ nhưng vẫn nét
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDiv.scrollHeight
    });

    // Xóa element tạm thời
    document.body.removeChild(tempDiv);

    // Tạo PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm

    // Tính toán tỉ lệ để ảnh vừa đúng 1 trang A4
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let finalImgWidth = imgWidth;
    let finalImgHeight = imgHeight;
    let posY = 0;

    // Nếu ảnh cao hơn trang A4, scale lại để vừa chiều cao
    if (imgHeight > pageHeight) {
      finalImgHeight = pageHeight;
      finalImgWidth = (canvas.width * finalImgHeight) / canvas.height;
      posY = 0;
    }

    // Thêm ảnh vào PDF, căn giữa nếu cần
    const posX = (pageWidth - finalImgWidth) / 2;
    pdf.addImage(imgData, 'PNG', posX, posY, finalImgWidth, finalImgHeight);

    // Xuất file
    const fileName = `${data.personalInfo?.fullName || 'CV'}_${theme}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Không thể xuất PDF. Vui lòng thử lại.');
  }
};

// Hàm tạo nội dung CV dựa trên theme
const createCVContent = (theme, data) => {
  const { personalInfo, summary, education, experience, skills, projects, languages, certifications } = data;

  if (theme === 'modern') {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: white; color: #333; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="font-size: 2.2rem; margin: 0 0 8px 0; font-weight: bold;">
            ${personalInfo?.fullName || 'Họ và tên'}
          </h1>
          <p style="font-size: 1.1rem; margin: 0 0 15px 0; opacity: 0.9;">
            ${experience?.[0]?.position || 'Vị trí công việc'}
          </p>
          <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            ${personalInfo?.email ? `<span style="font-size: 0.85rem;">📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo?.phone ? `<span style="font-size: 0.85rem;">📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo?.linkedin ? `<span style="font-size: 0.85rem;">💼 ${personalInfo.linkedin}</span>` : ''}
          </div>
          ${personalInfo?.address ? `<p style="font-size: 0.85rem; margin: 8px 0 0 0; opacity: 0.8;">📍 ${personalInfo.address}</p>` : ''}
          ${personalInfo?.website ? `<p style="font-size: 0.85rem; margin: 8px 0 0 0; opacity: 0.8;">🌐 ${personalInfo.website}</p>` : ''}
        </div>

        <!-- Content -->
        <div style="padding: 25px;">
          ${summary ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 12px;">Tóm tắt</h2>
              <p style="font-size: 0.95rem; line-height: 1.5; color: #666;">${summary}</p>
            </div>
          ` : ''}

          ${experience && experience.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px;">Kinh nghiệm làm việc</h2>
              ${experience.map(exp => `
                <div style="margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <h3 style="font-size: 1.1rem; margin: 0; color: #333;">${exp.position}</h3>
                    <span style="font-size: 0.85rem; color: #667eea; font-weight: bold;">${exp.startDate} - ${exp.endDate}</span>
                  </div>
                  <p style="font-size: 0.95rem; color: #667eea; margin: 4px 0; font-weight: bold;">${exp.company}</p>
                  ${exp.description ? `<p style="font-size: 0.95rem; line-height: 1.5; color: #34495e; margin: 0; text-align: justify;">${exp.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${education && education.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px;">Học vấn</h2>
              ${education.map(edu => `
                <div style="margin-bottom: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <h3 style="font-size: 1rem; margin: 0; color: #333;">${edu.degree}</h3>
                    <span style="font-size: 0.85rem; color: #667eea; font-weight: bold;">${edu.year}</span>
                  </div>
                  <p style="font-size: 0.95rem; color: #667eea; margin: 4px 0; font-weight: bold;">${edu.school}</p>
                  ${edu.gpa ? `<p style="font-size: 0.85rem; color: #666; margin: 0;">GPA: ${edu.gpa}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${skills && skills.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px;">Kỹ năng</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${skills.map(skill => `
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 6px 12px; border-radius: 15px; font-size: 0.85rem; font-weight: bold;">
                    ${skill.name} ${skill.level ? `(${skill.level})` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${projects && projects.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px;">Dự án</h2>
              ${projects.map(project => `
                <div style="margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <h3 style="font-size: 1rem; margin: 0; color: #333;">${project.name}</h3>
                  </div>
                  ${project.description ? `<p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">${project.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${languages && languages.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px;">Ngôn ngữ</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                ${languages.map(lang => `
                  <div style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 8px 12px; border-radius: 6px; min-width: 100px;">
                    <div style="font-size: 0.95rem; font-weight: bold; color: #333;">${lang.name}</div>
                    <div style="font-size: 0.85rem; color: #667eea;">${lang.level}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${certifications && certifications.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.3rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px;">Chứng chỉ</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                ${certifications.map(cert => `
                  <div style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 10px 12px; border-radius: 6px; min-width: 140px;">
                    <div style="font-size: 0.95rem; font-weight: bold; color: #333;">${cert.name}</div>
                    ${cert.year ? `<div style="font-size: 0.85rem; color: #667eea;">${cert.year}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  } else if (theme === 'classic') {
    return `
      <div style="font-family: Times New Roman, serif; max-width: 800px; margin: 0 auto; background-color: white; color: #2c3e50; line-height: 1.5; padding: 20px;">
        <!-- Header -->
        <div style="border-bottom: 3px solid #2c3e50; padding-bottom: 15px; margin-bottom: 25px; text-align: center;">
          <h1 style="font-size: 2.4rem; margin: 0 0 8px 0; font-weight: bold; color: #2c3e50; text-transform: uppercase; letter-spacing: 1.5px;">
            ${personalInfo?.fullName || 'Họ và tên'}
          </h1>
          <p style="font-size: 1.2rem; margin: 0 0 12px 0; color: #34495e; font-style: italic;">
            ${experience?.[0]?.position || 'Vị trí công việc'}
          </p>
          <div style="display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; font-size: 0.95rem;">
            ${personalInfo?.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo?.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo?.linkedin ? `<span>💼 ${personalInfo.linkedin}</span>` : ''}
          </div>
          ${personalInfo?.address ? `<p style="font-size: 0.95rem; margin: 8px 0 0 0; color: #7f8c8d;">📍 ${personalInfo.address}</p>` : ''}
           ${personalInfo?.website ? `<p style="font-size: 0.85rem; margin: 8px 0 0 0; opacity: 0.8;">🌐 ${personalInfo.website}</p>` : ''}        
          </div>

        <!-- Content -->
        <div style="padding: 0 15px;">
          ${summary ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 12px; text-transform: uppercase; font-weight: bold;">Tóm tắt</h2>
              <p style="font-size: 0.95rem; line-height: 1.6; color: #34495e; text-align: justify;">${summary}</p>
            </div>
          ` : ''}

          ${experience && experience.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; font-weight: bold;">Kinh nghiệm làm việc</h2>
              ${experience.map(exp => `
                <div style="margin-bottom: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <h3 style="font-size: 1.1rem; margin: 0; color: #2c3e50; font-weight: bold;">${exp.position}</h3>
                    <span style="font-size: 0.9rem; color: #7f8c8d; font-style: italic;">${exp.startDate} - ${exp.endDate}</span>
                  </div>
                  <p style="font-size: 1rem; color: #34495e; margin: 4px 0 8px 0; font-weight: bold;">${exp.company}</p>
                  ${exp.description ? `<p style="font-size: 0.95rem; line-height: 1.5; color: #34495e; margin: 0; text-align: justify;">${exp.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${education && education.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; font-weight: bold;">Học vấn</h2>
              ${education.map(edu => `
                <div style="margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <h3 style="font-size: 1rem; margin: 0; color: #2c3e50; font-weight: bold;">${edu.degree}</h3>
                    <span style="font-size: 0.9rem; color: #7f8c8d; font-style: italic;">${edu.year}</span>
                  </div>
                  <p style="font-size: 0.95rem; color: #34495e; margin: 4px 0; font-weight: bold;">${edu.school}</p>
                  ${edu.gpa ? `<p style="font-size: 0.9rem; color: #7f8c8d; margin: 0;">GPA: ${edu.gpa}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${skills && skills.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; font-weight: bold;">Kỹ năng</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                ${skills.map(skill => `
                  <div style="border: 1px solid #bdc3c7; padding: 10px 12px; border-radius: 4px; background-color: #f8f9fa;">
                    <div style="font-size: 0.95rem; font-weight: bold; color: #2c3e50;">${skill.name}</div>
                    ${skill.level ? `<div style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">${skill.level}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${projects && projects.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; font-weight: bold;">Dự án</h2>
              ${projects.map(project => `
                <div style="margin-bottom: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <h3 style="font-size: 1rem; margin: 0; color: #2c3e50; font-weight: bold;">${project.name}</h3>
                  </div>
                  ${project.description ? `<p style="font-size: 0.95rem; line-height: 1.5; color: #34495e; margin: 0; text-align: justify;">${project.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${languages && languages.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; font-weight: bold;">Ngôn ngữ</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;">
                ${languages.map(lang => `
                  <div style="border: 1px solid #bdc3c7; padding: 8px 10px; border-radius: 4px; text-align: center;">
                    <div style="font-size: 0.95rem; font-weight: bold; color: #2c3e50;">${lang.name}</div>
                    <div style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">${lang.level}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${certifications && certifications.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 1.2rem; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; font-weight: bold;">Chứng chỉ</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                ${certifications.map(cert => `
                  <div style="border: 1px solid #bdc3c7; padding: 10px 12px; border-radius: 4px; background-color: #f8f9fa;">
                    <div style="font-size: 0.95rem; font-weight: bold; color: #2c3e50;">${cert.name}</div>
                    ${cert.year ? `<div style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">${cert.year}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  } else {
    // Professional theme
    return `
      <div style="font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; background-color: white; color: #1a1a1a; padding: 20px;">
        <!-- Header -->
        <div style="background: #1a1a1a; color: white; padding: 25px 30px; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #007acc, #00d4aa, #ff6b35);"></div>
          <h1 style="font-size: 2.2rem; margin: 0 0 6px 0; font-weight: 300; letter-spacing: 0.8px;">
            ${personalInfo?.fullName || 'Họ và tên'}
          </h1>
          <p style="font-size: 1rem; margin: 0 0 15px 0; color: #00d4aa; font-weight: 500;">
            ${experience?.[0]?.position || 'Vị trí công việc'}
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; font-size: 0.85rem;">
            ${personalInfo?.email ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #00d4aa;">📧</span><span>${personalInfo.email}</span></div>` : ''}
            ${personalInfo?.phone ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #00d4aa;">📱</span><span>${personalInfo.phone}</span></div>` : ''}
            ${personalInfo?.linkedin ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #00d4aa;">💼</span><span>${personalInfo.linkedin}</span></div>` : ''}
            ${personalInfo?.address ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #00d4aa;">📍</span><span>${personalInfo.address}</span></div>` : ''}
            ${personalInfo?.website ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="color: #00d4aa;">🌐</span><span>${personalInfo.website}</span></div>` : ''}
            </div>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          ${summary ? `
            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 1.2rem; color: #1a1a1a; margin-bottom: 12px; font-weight: 600; position: relative; padding-left: 12px;">
                <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #007acc;"></span>
                TÓM TẮT
              </h2>
              <p style="font-size: 0.95rem; line-height: 1.6; color: #4a4a4a; margin: 0; text-align: justify;">${summary}</p>
            </div>
          ` : ''}

          ${experience && experience.length > 0 ? `
            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 1.2rem; color: #1a1a1a; margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 12px;">
                <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #007acc;"></span>
                KINH NGHIỆM LÀM VIỆC
              </h2>
              ${experience.map(exp => `
                <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e8e8e8; border-radius: 6px; background-color: #fafafa;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <h3 style="font-size: 1rem; margin: 0 0 4px 0; color: #1a1a1a; font-weight: 600;">${exp.position}</h3>
                      <p style="font-size: 0.95rem; margin: 0; color: #007acc; font-weight: 500;">${exp.company}</p>
                    </div>
                    <span style="font-size: 0.85rem; color: #666; background-color: #e8e8e8; padding: 3px 6px; border-radius: 3px; font-weight: 500;">${exp.startDate} - ${exp.endDate}</span>
                  </div>
                  ${exp.description ? `<p style="font-size: 0.9rem; line-height: 1.5; color: #4a4a4a; margin: 0; text-align: justify;">${exp.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${education && education.length > 0 ? `
            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 1.2rem; color: #1a1a1a; margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 12px;">
                <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #007acc;"></span>
                HỌC VẤN
              </h2>
              ${education.map(edu => `
                <div style="margin-bottom: 15px; padding: 15px; border: 1px solid #e8e8e8; border-radius: 6px; background-color: #fafafa;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div>
                      <h3 style="font-size: 0.95rem; margin: 0 0 4px 0; color: #1a1a1a; font-weight: 600;">${edu.degree}</h3>
                      <p style="font-size: 0.9rem; margin: 0; color: #007acc; font-weight: 500;">${edu.school}</p>
                    </div>
                    <span style="font-size: 0.85rem; color: #666; background-color: #e8e8e8; padding: 3px 6px; border-radius: 3px; font-weight: 500;">${edu.year}</span>
                  </div>
                  ${edu.gpa ? `<p style="font-size: 0.85rem; color: #666; margin: 6px 0 0 0;">GPA: <strong>${edu.gpa}</strong></p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${skills && skills.length > 0 ? `
            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 1.2rem; color: #1a1a1a; margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 12px;">
                <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #007acc;"></span>
                KỸ NĂNG
              </h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px;">
                ${skills.map(skill => `
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6; padding: 12px; border-radius: 6px; text-align: center;">
                    <div style="font-size: 0.95rem; font-weight: 600; color: #1a1a1a; margin-bottom: 4px;">${skill.name}</div>
                    ${skill.level ? `<div style="font-size: 0.8rem; color: #007acc; font-weight: 500; background-color: rgba(0, 122, 204, 0.1); padding: 3px 6px; border-radius: 10px; display: inline-block;">${skill.level}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${projects && projects.length > 0 ? `
            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 1.2rem; color: #1a1a1a; margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 12px;">
                <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #007acc;"></span>
                DỰ ÁN
              </h2>
              ${projects.map(project => `
                <div style="margin-bottom: 15px; padding: 15px; border: 1px solid #e8e8e8; border-radius: 6px; background-color: #fafafa;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h3 style="font-size: 1rem; margin: 0; color: #1a1a1a; font-weight: 600;">${project.name}</h3>
                  </div>
                  ${project.description ? `<p style="font-size: 0.9rem; line-height: 1.5; color: #4a4a4a; margin: 0; text-align: justify;">${project.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
};

// ... existing code ...