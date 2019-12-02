#!/bin/bash
export KUBE_NAMESPACE="default"
if [ ! -x "$(command -v helm)" ]; then
  echo "could not find helm installation"
  exit 1
fi

if [ ! -x "$(command -v kubectl)" ]; then
  echo "could not find kubectl installation"
  exit 1
fi

if [[ -z "$(kubectl config view)" ]]; then
  echo "There is no kubeconfig setup."
  exit 1
fi


echo "Installing nginx ingress"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml

cd charts

export CHART_PATH="./hodl"

helm lint $CHART_PATH
helm dep update $CHART_PATH

export RELEASE_NAME="hodl"
export DEPLOYS=$(helm ls -n "$KUBE_NAMESPACE"| grep $RELEASE_NAME | grep "deployed" --ignore-case | wc -l)
export FAILS=$(helm ls -n "$KUBE_NAMESPACE"| grep $RELEASE_NAME | grep "failed" --ignore-case | wc -l)

if [ ${FAILS} -ne 0 ]; then
  helm ls --all --short | xargs -L1 helm delete -n "$KUBE_NAMESPACE"
fi

if [ ${DEPLOYS}  -eq 0 ]; then
  echo "Creating helm deployment"
  helm install ${RELEASE_NAME} $CHART_PATH -n "$KUBE_NAMESPACE"
else
  echo "Upgrading helm deployment"
  helm upgrade ${RELEASE_NAME} $CHART_PATH -n "$KUBE_NAMESPACE"
fi
