# logs.tf

# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "vio_assessment_solution_log_group" {
  name              = "/ecs/vio-assessment-solution"
  retention_in_days = 30

  tags = {
    Name = "cb-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "vio_assessment_solution_log_stream" {
  name           = "vio-assessment-solution-log-stream"
  log_group_name = aws_cloudwatch_log_group.vio_assessment_solution_log_group.name
}
