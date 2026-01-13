import { FC, Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "../../../../../contexts/ToastContext";

const apiService = {
  getDanhSachLo: async (maDonVi, query = "") => {
    try {
      const url = new URL(
        `${import.meta.env.VITE_API_URL}kiem-tra-quy-iv/danh-sach-lo`
      );

      if (maDonVi) {
        url.searchParams.append("nongTruong", maDonVi);
      }

      const response = await axios.get(url.toString());

      if (response.status === 200 && response.data) {
        return {
          success: true,
          data: response.data.data || [],
          message: "Lấy dữ liệu thành công",
        };
      }

      return {
        success: false,
        data: [],
        message: "Không lấy được dữ liệu",
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.message || "Có lỗi xảy ra",
      };
    }
  },
  getPhieuIn: async (id) => {
    try {
      const url = new URL(
        `${import.meta.env.VITE_API_URL}kiem-tra-quy-iv/phieu-in/${id}`
      );

      const response = await axios.get(url.toString());
      return response;
    } catch (error) {
      return null;
    }
  },
};

const DanhSachLoKTCB = () => {
  const [dataLo, setDataLo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [donViSelect, setDonViSelect] = useState(null);
  const { showToast } = useToast();

  const loadDataLo = async (query = "") => {
    setLoading(true);
    try {
      const result = await apiService.getDanhSachLo(query);
      if (result) {
        setDataLo(result.data ?? []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataLo();
  }, []);

  const handlePrinter = async (id) => {
    // Tính toán vị trí giữa màn hình
    const screenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const screenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;
    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - 1200) / 2 / systemZoom + screenLeft;
    const top = (height - 1500) / 2 / systemZoom + screenTop;

    const printWindow = window.open(
      "",
      "_blank",
      `width=1200,height=1500,left=${left},top=${top}`
    );
    if (!printWindow) {
      alert("Trình duyệt đang chặn cửa sổ in, vui lòng bật pop-up!");
      return;
    }
    try {
      const result = await apiService.getPhieuIn(id);

      if (!result || !result.data) {
        showToast({
          title: "Thông báo",
          message: "Không có dữ liệu để in!",
          variant: "warning",
        });
        printWindow.close();
        return;
      }

      // console.log(result);return
      const html = result.data;

      // printWindow.document.open();
      printWindow.document.write(html);
      // printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => printWindow.close();
      };
    } catch (error) {
      ("");
    }
  };

  return (
    <Fragment>
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>DANH SÁCH LÔ KIỂM TRA CUỐI NĂM KTCB</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Row>
                  <Col xl={2}>
                    <Form.Select
                      aria-label="Chọn đơn vị"
                      value={donViSelect}
                      disabled={""}
                      onChange={(e) => {
                        setDonViSelect(e.target.value);
                      }}>
                      <option value="">Chọn đơn vị</option>
                      <option value={"AL"}>An Lộc</option>
                      <option value={"BL"}>Bình Lộc</option>
                      <option value={"CĐ"}>Cẩm Đường</option>
                      <option value={"CM"}>Cẩm Mỹ</option>
                      <option value={"OQ"}>Ông Quế</option>
                      <option value={"LT"}>Long Thành</option>
                    </Form.Select>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="d-flex gap-3">
                    <Button
                      className="btn btn-primary label-btn "
                      onClick={() => loadDataLo(donViSelect)}
                      disabled={loading}>
                      <i className="bi bi-search label-btn-icon me-2"></i>
                      {loading ? "Đang tải..." : "Tải dữ liệu"}
                    </Button>
                    <Link
                      to={`/kiemTraKyThuat/kiemTraQuyIII/danhMuc/danhSachLo/import`}>
                      <Button className="btn btn-secondary label-btn ms-auto">
                        <i className="bi bi-plus-lg label-btn-icon me-2"></i>
                        Import dữ liệu
                      </Button>
                    </Link>
                    <Link
                      to={`https://api.donaruco.vn/public/kiem-tra-quy-4/export-all`}>
                      <Button className="btn btn-success label-btn ms-auto">
                        <i className="bi bi-plus-lg label-btn-icon me-2"></i>
                        Export phiếu
                      </Button>
                    </Link>
                    <Link
                      to={`https://api.donaruco.vn/api/kiem-tra-quy-4/export-ktcb`}>
                      <Button className="btn btn-warning label-btn ms-auto">
                        <i className="bi bi-plus-lg label-btn-icon me-2"></i>
                        Export cây
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Row>

              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap">STT</th>
                      <th className="text-wrap">ID phiếu</th>
                      <th className="text-wrap">Đội</th>
                      <th className="text-wrap">ID lô</th>
                      <th className="text-center">Tên lô</th>
                      <th className="text-center">Năm trồng</th>
                      <th className="text-center">Năm KTCB</th>
                      <th className="text-wrap">Hạng đất</th>
                      <th className="text-wrap">Giống</th>
                      <th className="text-wrap">Diện tích KK</th>
                      <th className="text-wrap">Ngày KT</th>
                      <th className="text-wrap">Người KT</th>
                      <th className="text-wrap">Trạng thái</th>
                      <th className="text-wrap">In phiếu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLo && dataLo.length > 0 ? (
                      dataLo.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.idPhieu}</td>
                          <td>{item.nongTruong}</td>
                          <td>{item.idLo}</td>
                          <td>{item.tenLo}</td>
                          <td>{item.namTrong}</td>
                          <td>{item.namKTCB}</td>
                          <td>{item.hangDat}</td>
                          <td>{item.giongCay}</td>
                          <td>{item.dienTich}</td>
                          <td>
                            {item.ngayKiemTra
                              ? new Date(item.ngayKiemTra).toLocaleString(
                                  "vi-VN",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )
                              : ""}
                          </td>
                          <td>{item.kiemTraVien}</td>
                          <td>
                            <Button
                              type="button"
                              variant={
                                item.TrangThai === 1
                                  ? "success-ghost"
                                  : "danger-ghost"
                              }
                              size="sm"
                              className="btn btn-wawe">
                              {item.TrangThai === 1 ? "Đã gửi" : "Chưa gửi"}
                            </Button>
                          </td>
                          <td>
                            <div className="fs-15">
                              <Link
                                onClick={() => {
                                  handlePrinter(item.idPhieu);
                                }}
                                className="btn btn-icon btn-xl btn-primary-transparent rounded-pill">
                                <i className="ri-printer-line"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          {loading ? (
                            <div className="d-flex justify-content-center">
                              <div
                                className="spinner-border text-primary"
                                role="status">
                                <span className="visually-hidden">
                                  Đang tải...
                                </span>
                              </div>
                            </div>
                          ) : (
                            "Không có dữ liệu"
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          max-height: 970px;
          overflow-y: auto;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10; /* Đảm bảo tiêu đề nằm trên nội dung bảng */
          background-color: inherit; /* Giữ màu nền của tiêu đề */
        }

        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-HTPC {
          width: 100px;
        }
        .table th.col-tenCN {
          width: 200px;
        }
        .table th.col-maCN {
          width: 120px;
        }

        .table tr.table-active {
          font-weight: bold;
          background-color: #f1f1f1;
        }
        /* Tùy chỉnh thanh trượt ngang */
        .table-responsive::-webkit-scrollbar {
          height: 12px; /* Tăng chiều rộng thanh trượt ngang */
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1; /* Màu nền của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #888; /* Màu của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555; /* Màu khi hover */
        }
      `}</style>
    </Fragment>
  );
};

export default DanhSachLoKTCB;
