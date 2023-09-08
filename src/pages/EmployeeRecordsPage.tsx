import React, { useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TablePagination,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useGetEmployees } from "../customHooks/useGetEmployeesHook";
import { useAppDispatch } from "../redux/hooks";
import { getEmployeeById } from "../api/employeeApi";
import { DeleteEmployeeModal } from "../modals/DeleteEmployeeModal";

const EmployeeRecordsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"active" | "deleted">(
    "active"
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { employees, count } = useGetEmployees(
    page + 1,
    rowsPerPage,
    statusFilter
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigateToEmployeeDetails = async (id: string) => {
    await dispatch(getEmployeeById(id));
    navigate(`/id/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Records
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create"
        >
          Create
        </Button>

        <ToggleButtonGroup
          exclusive
          value={statusFilter}
          onChange={(event, newFilter) => setStatusFilter(newFilter)}
        >
          <ToggleButton value="active" aria-label="active">
            Active
          </ToggleButton>
          <ToggleButton value="deleted" aria-label="deleted">
            Deleted
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Employment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row, index) => (
              <TableRow
                key={row._id}
                onClick={() => navigateToEmployeeDetails(row._id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.dateOfEmployment}</TableCell>
                <TableCell>{row.isDeleted ? "Deleted" : "Active"}</TableCell>
                <TableCell>
                  {statusFilter !== "deleted" && (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteEmployeeId(row._id);
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Outlet />
      <DeleteEmployeeModal
        isOpen={!!deleteEmployeeId}
        id={deleteEmployeeId}
        onClose={() => setDeleteEmployeeId(null)}
      />
    </Container>
  );
};

export default EmployeeRecordsPage;
