terraform {
    backend "s3" {
      bucket = "remotebackend"
      key    = "hilarityapp/terraform.tfstate"
      region = "us-west-1"
      profile = "jds"
    }
  }
