# Main file used to create an ECS cluster

resource "aws_ecs_cluster" "main" {
  name = "midSemApp-cluster"
}

#metadata for the resource are defined here
data "template_file" "vio_assessment_solution" {
  template = file("./templates/ecs/vio-assessment-solution.json.tpl")

  vars = {
    app_image      = var.app_image
    app_port       = var.app_port
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.aws_region
  }
}

#Task definition along with required details for the task
resource "aws_ecs_task_definition" "app" {
  family                   = "vio-assessment-solution-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.vio_assessment_solution.rendered
}

#Main task details are defined
#We used FARGATE cluster because it is automatically managed by AWS
resource "aws_ecs_service" "main" {
  name            = "vio-assessment-solution-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.app.id
    container_name   = "vio-assessment-solution"
    container_port   = var.app_port
  }

  depends_on = [aws_alb_listener.front_end, aws_iam_role_policy_attachment.ecs_task_execution_role]
}
