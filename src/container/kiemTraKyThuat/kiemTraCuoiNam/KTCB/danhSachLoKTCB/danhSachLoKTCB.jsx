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
import Pageheader from "../../../../../components/pageheader/pageheader";
// import { donVidata } from "../../danhMuc/dinhMuc/dinhMucData";
import { useToast } from "../../../../../contexts/ToastContext";

const apiService = {
  getDanhSachLo: async (maDonVi, query = "") => {
    try {
      const url = new URL(
        `${
          import.meta.env.VITE_API_URL
        }kiem-tra-quy-iii/danh-muc/import-danh-sach-lo`
      );

      // Thêm các tham số vào URL
      if (maDonVi) {
        url.searchParams.append("maDonVi", maDonVi);
      }
      if (query) {
        url.searchParams.append("keyword", query);
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
};

const DanhSachLoKTCB = () => {
  const [dataLo, setDataLo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const loadDataLo = async (query = "") => {
    setLoading(true);
    try {
      const result = await apiService.getDanhSachLo(query);
      if (result) {
        console.log("result", result);
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
                      value={""}
                      disabled={""}
                      onChange={(e) => {
                        setDonViSelect(e.target.value);
                        handleChangeDonVi(e.target.value);
                      }}>
                      <option value="">Chọn đơn vị</option>

                      <option value={""}></option>
                    </Form.Select>
                  </Col>
                  <Col xl={4} lg={6} md={6} sm={12} className="d-flex gap-3">
                    <Button
                      className="btn btn-primary label-btn "
                      onClick={() => loadDataLo(keyword)}
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
                  </Col>
                </Row>
              </Row>

              <div className="table-responsive">
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap">STT</th>
                      <th className="text-wrap">Đội</th>
                      <th className="text-center">Tên lô</th>
                      <th className="text-center">Năm trồng</th>
                      <th className="text-wrap">Hạng đất</th>
                      <th className="text-wrap">Giống</th>
                      <th className="text-wrap">Diện tích KK</th>
                      <th className="text-wrap">Trạng thái</th>
                      <th className="text-wrap">Stutus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLo && dataLo.length > 0 ? (
                      dataLo.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.maDonVi}</td>
                          <td>{item.lo}</td>
                          <td>{item.namTrong}</td>
                          <td>{item.hangDat}</td>
                          <td>{item.giong}</td>
                          <td>{item.dienTichKK}</td>
                          <td></td>
                          <td>
                            <div className="hstack gap-2 fs-15">
                              <Link
                                to="#"
                                className="btn btn-icon btn-sm btn-success-transparent rounded-pill">
                                <i className="ri-download-2-line"></i>
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-icon btn-sm btn-info-transparent rounded-pill">
                                <i className="ri-edit-line"></i>
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-icon btn-sm btn-danger-transparent rounded-pill">
                                <i className="ri-delete-bin-line"></i>
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
          max-height: 660px;
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
        .table th.col-sxkd-01012025,
        .table th.col-mocao-2025,
        .table th.col-sxkd-thanhlytc,
        .table th.col-sxkd-thanhlygdp,
        .table th.col-sxkd-31122025,
        .table th.col-ktcb-01012025,
        .table th.col-ktcb-mocao-2025,
        .table th.col-ktcb-thanhlygdp,
        .table th.col-ktcb-31122025,
        .table th.col-kh-tctm-2025,
        .table th.col-luancanh-2021,
        .table th.col-luancanh-2022,
        .table th.col-luancanh-2023,
        .table th.col-tong-luancanh,
        .table th.col-fsc,
        .table th.col-vg-vn,
        .table th.col-cho-gdp,
        .table th.col-dt-chuyentc,
        .table th.col-thanhly-goivu,
        .table th.col-tong-dt-vuon {
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
