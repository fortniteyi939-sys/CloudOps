// Tarifas simuladas (USD/hora) para referencia de cálculo
export const costRates: Record<string, number> = {
  ec2: 0.096,
  s3: 0.023,
  rds: 0.145,
  iam: 0,
  vpc: 0.005,
  route53: 0.0006,
  cloudfront: 0.012,
  elb: 0.028,
};