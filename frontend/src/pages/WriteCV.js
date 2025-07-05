import React, { useState, useContext } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Divider, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import ModernTheme from '../components/cvThemes/ModernTheme';
import ClassicTheme from '../components/cvThemes/ClassicTheme';
import ProfessionalTheme from '../components/cvThemes/ProfessionalTheme';
import { exportToPDF } from '../utils/pdfExporter';
import '../css/WriteCV.css';
import { UserContext } from "../UserContext";
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const WriteCV = () => {
  const [form] = Form.useForm();
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: []
  });

  const themes = {
    modern: ModernTheme,
    classic: ClassicTheme,
    professional: ProfessionalTheme
  };

  const ThemeComponent = themes[selectedTheme];

  const handleFormChange = (changedValues, allValues) => {
    // Đảm bảo tất cả các mảng đều tồn tại và là array
    const sanitizedData = {
      personalInfo: allValues.personalInfo || {},
      summary: allValues.summary || '',
      education: Array.isArray(allValues.education) ? allValues.education.filter(item => item) : [],
      experience: Array.isArray(allValues.experience) ? allValues.experience.filter(item => item) : [],
      skills: Array.isArray(allValues.skills) ? allValues.skills.filter(item => item) : [],
      projects: Array.isArray(allValues.projects) ? allValues.projects.filter(item => item) : [],
      languages: Array.isArray(allValues.languages) ? allValues.languages.filter(item => item) : [],
      certifications: Array.isArray(allValues.certifications) ? allValues.certifications.filter(item => item) : []
    };
    
    setCvData(sanitizedData);
  };

  const handleExportPDF = async () => {
    try {
      // Validate dữ liệu trước khi xuất
      const formData = form.getFieldsValue();
      if (!formData.personalInfo?.fullName) {
        message.error('Vui lòng nhập họ và tên!');
        return;
      }
      
      await exportToPDF(selectedTheme, cvData);
      message.success('CV đã được xuất thành công!');
    } catch (error) {
      message.error('Có lỗi khi xuất PDF: ' + error.message);
    }
  };

  // Hàm để thêm item mới với dữ liệu mặc định
  const addEducationItem = () => {
    const currentEducation = form.getFieldValue('education') || [];
    form.setFieldsValue({
      education: [...currentEducation, { degree: '', school: '', year: '', gpa: '' }]
    });
  };

  const addExperienceItem = () => {
    const currentExperience = form.getFieldValue('experience') || [];
    form.setFieldsValue({
      experience: [...currentExperience, { position: '', company: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const addSkillItem = () => {
    const currentSkills = form.getFieldValue('skills') || [];
    form.setFieldsValue({
      skills: [...currentSkills, { name: '', level: '' }]
    });
  };

  const addProjectItem = () => {
    const currentProjects = form.getFieldValue('projects') || [];
    form.setFieldsValue({
      projects: [...currentProjects, { name: '', url: '', description: '' }]
    });
  };

  const addLanguageItem = () => {
    const currentLanguages = form.getFieldValue('languages') || [];
    form.setFieldsValue({
      languages: [...currentLanguages, { name: '', level: '' }]
    });
  };

  const addCertificationItem = () => {
    const currentCertifications = form.getFieldValue('certifications') || [];
    form.setFieldsValue({
      certifications: [...currentCertifications, { name: '', year: '' }]
    });
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <h2>Bạn cần đăng nhập để sử dụng chức năng này</h2>
        <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập</Button>
      </div>
    );
  }

  return (
    <div className="write-cv-container">
      <Row gutter={24}>
        {/* Form nhập liệu */}
        <Col xs={24} lg={12}>
          <Card title="Thông tin CV" className="cv-form-card">
            <Form
              form={form}
              layout="vertical"
              initialValues={cvData}
              onValuesChange={handleFormChange}
            >
              {/* Chọn theme */}
              <Form.Item label="Chọn theme" name="theme" className="theme-selector">
                <Select
                  value={selectedTheme}
                  onChange={setSelectedTheme}
                  style={{ width: '100%' }}
                >
                  <Option value="modern">Modern</Option>
                  <Option value="classic">Classic</Option>
                  <Option value="professional">Professional</Option>
                </Select>
              </Form.Item>

              <Divider className="section-divider">Thông tin cá nhân</Divider>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Họ và tên" name={['personalInfo', 'fullName']}>
                    <Input placeholder="Nguyễn Văn A" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name={['personalInfo', 'email']}>
                    <Input placeholder="example@email.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Số điện thoại" name={['personalInfo', 'phone']}>
                    <Input placeholder="0123456789" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="LinkedIn" name={['personalInfo', 'linkedin']}>
                    <Input placeholder="linkedin.com/in/username" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Địa chỉ" name={['personalInfo', 'address']}>
                <Input placeholder="Hà Nội, Việt Nam" />
              </Form.Item>

              <Form.Item label="Website" name={['personalInfo', 'website']}>
                <Input placeholder="https://example.com" />
              </Form.Item>

              <Divider className="section-divider">Tóm tắt</Divider>
              
              <Form.Item label="Tóm tắt bản thân" name="summary">
                <TextArea 
                  rows={4} 
                  placeholder="Mô tả ngắn gọn về bản thân, mục tiêu nghề nghiệp..."
                />
              </Form.Item>

              <Divider className="section-divider">Học vấn</Divider>
              
              <Form.List name="education">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" className="dynamic-form-item">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'degree']}
                              label="Bằng cấp"
                              rules={[{ required: true, message: 'Vui lòng nhập bằng cấp!' }]}
                            >
                              <Input placeholder="Cử nhân Khoa học máy tính" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'school']}
                              label="Trường học"
                              rules={[{ required: true, message: 'Vui lòng nhập trường học!' }]}
                            >
                              <Input placeholder="Đại học Bách Khoa Hà Nội" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'year']}
                              label="Năm tốt nghiệp"
                            >
                              <Input placeholder="2023" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'gpa']}
                              label="GPA"
                            >
                              <Input placeholder="3.8/4.0" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button 
                          type="text" 
                          danger 
                          icon={<MinusCircleOutlined />} 
                          onClick={() => remove(name)}
                          className="remove-button"
                        >
                          Xóa
                        </Button>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={addEducationItem}
                        block 
                        icon={<PlusOutlined />}
                        className="add-button"
                      >
                        Thêm học vấn
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider className="section-divider">Kinh nghiệm làm việc</Divider>
              
              <Form.List name="experience">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" className="dynamic-form-item">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'position']}
                              label="Vị trí"
                              rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}
                            >
                              <Input placeholder="Frontend Developer" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'company']}
                              label="Công ty"
                              rules={[{ required: true, message: 'Vui lòng nhập công ty!' }]}
                            >
                              <Input placeholder="Tech Company" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'startDate']}
                              label="Ngày bắt đầu"
                            >
                              <Input placeholder="01/2023" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'endDate']}
                              label="Ngày kết thúc"
                            >
                              <Input placeholder="Hiện tại" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label="Mô tả công việc"
                        >
                          <TextArea rows={3} placeholder="Mô tả các công việc đã làm..." />
                        </Form.Item>
                        <Button 
                          type="text" 
                          danger 
                          icon={<MinusCircleOutlined />} 
                          onClick={() => remove(name)}
                          className="remove-button"
                        >
                          Xóa
                        </Button>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={addExperienceItem}
                        block 
                        icon={<PlusOutlined />}
                        className="add-button"
                      >
                        Thêm kinh nghiệm
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider className="section-divider">Kỹ năng</Divider>
              
              <Form.List name="skills">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} style={{ marginBottom: '8px' }}>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Vui lòng nhập tên kỹ năng!' }]}
                          >
                            <Input placeholder="React" />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, 'level']}
                          >
                            <Select placeholder="Mức độ">
                              <Option value="Beginner">Beginner</Option>
                              <Option value="Intermediate">Intermediate</Option>
                              <Option value="Advanced">Advanced</Option>
                              <Option value="Expert">Expert</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button 
                            type="text" 
                            danger 
                            icon={<MinusCircleOutlined />} 
                            onClick={() => remove(name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={addSkillItem}
                        block 
                        icon={<PlusOutlined />}
                        className="add-button"
                      >
                        Thêm kỹ năng
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider className="section-divider">Dự án</Divider>
              
              <Form.List name="projects">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" className="dynamic-form-item">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              label="Tên dự án"
                              rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
                            >
                              <Input placeholder="E-commerce Website" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'url']}
                              label="Link dự án"
                            >
                              <Input placeholder="https://github.com/username/project" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label="Mô tả dự án"
                        >
                          <TextArea rows={3} placeholder="Mô tả về dự án, công nghệ sử dụng..." />
                        </Form.Item>
                        <Button 
                          type="text" 
                          danger 
                          icon={<MinusCircleOutlined />} 
                          onClick={() => remove(name)}
                          className="remove-button"
                        >
                          Xóa
                        </Button>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={addProjectItem}
                        block 
                        icon={<PlusOutlined />}
                        className="add-button"
                      >
                        Thêm dự án
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider className="section-divider">Ngôn ngữ</Divider>
              
              <Form.List name="languages">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} style={{ marginBottom: '8px' }}>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Vui lòng nhập ngôn ngữ!' }]}
                          >
                            <Input placeholder="Tiếng Anh" />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, 'level']}
                          >
                            <Select placeholder="Mức độ">
                              <Option value="Cơ bản">Cơ bản</Option>
                              <Option value="Trung bình">Trung bình</Option>
                              <Option value="Thành thạo">Thành thạo</Option>
                              <Option value="Bản ngữ">Bản ngữ</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button 
                            type="text" 
                            danger 
                            icon={<MinusCircleOutlined />} 
                            onClick={() => remove(name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={addLanguageItem}
                        block 
                        icon={<PlusOutlined />}
                        className="add-button"
                      >
                        Thêm ngôn ngữ
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider className="section-divider">Chứng chỉ</Divider>
              
              <Form.List name="certifications">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} style={{ marginBottom: '8px' }}>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Vui lòng nhập tên chứng chỉ!' }]}
                          >
                            <Input placeholder="AWS Certified Developer" />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, 'year']}
                          >
                            <Input placeholder="2023" />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button 
                            type="text" 
                            danger 
                            icon={<MinusCircleOutlined />} 
                            onClick={() => remove(name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={addCertificationItem}
                        block 
                        icon={<PlusOutlined />}
                        className="add-button"
                      >
                        Thêm chứng chỉ
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<DownloadOutlined />}
                  onClick={handleExportPDF}
                  style={{ width: '100%' }}
                  className="export-button"
                >
                  Xuất PDF
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Preview CV */}
        <Col xs={24} lg={12}>
          <Card title="Preview CV" className="cv-preview-card">
            <div className="cv-preview-container">
              <ThemeComponent data={cvData} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WriteCV; 